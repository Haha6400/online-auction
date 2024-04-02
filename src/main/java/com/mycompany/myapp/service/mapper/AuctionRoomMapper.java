package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

/**
 * Mapper for the entity {@link AuctionRoom} and its DTO {@link AuctionRoomDTO}.
 */
@Mapper(componentModel = "spring")
@Component
public interface AuctionRoomMapper extends EntityMapper<AuctionRoomDTO, AuctionRoom> {
    @Mapping(target = "users", source = "users", qualifiedByName = "userLoginSet")
    AuctionRoomDTO toDto(AuctionRoom s);

    @Mapping(target = "removeUser", ignore = true)
    AuctionRoom toEntity(AuctionRoomDTO auctionRoomDTO);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("userLoginSet")
    default Set<UserDTO> toDtoUserLoginSet(Set<User> user) {
        return user.stream().map(this::toDtoUserLogin).collect(Collectors.toSet());
    }
}
