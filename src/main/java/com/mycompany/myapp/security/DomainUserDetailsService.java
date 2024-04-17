package com.mycompany.myapp.security;

import com.mycompany.myapp.domain.Authority;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.UserRepository;
import java.util.*;
import org.hibernate.validator.internal.constraintvalidators.hv.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Authenticate a user from the database.
 */
@Component("userDetailsService")
public class DomainUserDetailsService implements UserDetailsService {

    private final Logger log = LoggerFactory.getLogger(DomainUserDetailsService.class);

    private final UserRepository userRepository;

    public DomainUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(final String login) {
        log.debug("Authenticating {}", login);
        User user;
        if (new EmailValidator().isValid(login, null)) {
            Optional<User> userByEmailFromDatabase = userRepository.findOneByEmailIgnoreCase(login);

            user = userByEmailFromDatabase.orElseThrow(() -> new UsernameNotFoundException("User with email " + login + " was not found in the database"));

            return createSpringSecurityUser(login, user);
        }

        String lowercaseLogin = login.toLowerCase(Locale.ENGLISH);
        Optional<User> userByLoginFromDatabase = userRepository.findOneByLogin(lowercaseLogin);
        user = userByLoginFromDatabase.orElseThrow(() -> new UsernameNotFoundException("User " + lowercaseLogin + " was not found in the database"));

        return createSpringSecurityUser(lowercaseLogin, user);
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String lowercaseLogin, User user) {
        if (!user.isActivated()) {
            throw new UserNotActivatedException("User " + lowercaseLogin + " was not activated");
        }
        List<SimpleGrantedAuthority> grantedAuthorities = user
            .getAuthorities()
            .stream()
            .map(Authority::getName)
            .map(SimpleGrantedAuthority::new)
            .toList();
        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), grantedAuthorities);
    }
}
