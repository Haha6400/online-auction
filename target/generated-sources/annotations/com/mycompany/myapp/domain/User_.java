package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(User.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class User_ extends com.mycompany.myapp.domain.AbstractAuditingEntity_ {

	
	/**
	 * @see com.mycompany.myapp.domain.User#lastName
	 **/
	public static volatile SingularAttribute<User, String> lastName;
	
	/**
	 * @see com.mycompany.myapp.domain.User#resetDate
	 **/
	public static volatile SingularAttribute<User, Instant> resetDate;
	
	/**
	 * @see com.mycompany.myapp.domain.User#login
	 **/
	public static volatile SingularAttribute<User, String> login;
	
	/**
	 * @see com.mycompany.myapp.domain.User#activationKey
	 **/
	public static volatile SingularAttribute<User, String> activationKey;
	
	/**
	 * @see com.mycompany.myapp.domain.User#resetKey
	 **/
	public static volatile SingularAttribute<User, String> resetKey;
	
	/**
	 * @see com.mycompany.myapp.domain.User#authorities
	 **/
	public static volatile SetAttribute<User, Authority> authorities;
	
	/**
	 * @see com.mycompany.myapp.domain.User#firstName
	 **/
	public static volatile SingularAttribute<User, String> firstName;
	
	/**
	 * @see com.mycompany.myapp.domain.User#password
	 **/
	public static volatile SingularAttribute<User, String> password;
	
	/**
	 * @see com.mycompany.myapp.domain.User#phoneNumber
	 **/
	public static volatile SingularAttribute<User, String> phoneNumber;
	
	/**
	 * @see com.mycompany.myapp.domain.User#langKey
	 **/
	public static volatile SingularAttribute<User, String> langKey;
	
	/**
	 * @see com.mycompany.myapp.domain.User#imageUrl
	 **/
	public static volatile SingularAttribute<User, String> imageUrl;
	
	/**
	 * @see com.mycompany.myapp.domain.User#id
	 **/
	public static volatile SingularAttribute<User, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.User
	 **/
	public static volatile EntityType<User> class_;
	
	/**
	 * @see com.mycompany.myapp.domain.User#email
	 **/
	public static volatile SingularAttribute<User, String> email;
	
	/**
	 * @see com.mycompany.myapp.domain.User#activated
	 **/
	public static volatile SingularAttribute<User, Boolean> activated;

	public static final String LAST_NAME = "lastName";
	public static final String RESET_DATE = "resetDate";
	public static final String LOGIN = "login";
	public static final String ACTIVATION_KEY = "activationKey";
	public static final String RESET_KEY = "resetKey";
	public static final String AUTHORITIES = "authorities";
	public static final String FIRST_NAME = "firstName";
	public static final String PASSWORD = "password";
	public static final String PHONE_NUMBER = "phoneNumber";
	public static final String LANG_KEY = "langKey";
	public static final String IMAGE_URL = "imageUrl";
	public static final String ID = "id";
	public static final String EMAIL = "email";
	public static final String ACTIVATED = "activated";

}

