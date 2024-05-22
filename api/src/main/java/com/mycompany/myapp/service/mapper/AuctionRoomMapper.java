package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

/**
 * Mapper for the entity {@link AuctionRoom} and its DTO {@link AuctionRoomDTO}.
 */
@Component
@Mapper(componentModel = "spring")
public interface AuctionRoomMapper extends EntityMapper<AuctionRoomDTO, AuctionRoom> {
    @Mapping(target = "licensePlate", source = "licensePlate")
    @Mapping(target = "users", source = "users")
    AuctionRoomDTO toDto(AuctionRoom s);

    @Mapping(target = "removeUser", ignore = true)
    AuctionRoom toEntity(AuctionRoomDTO auctionRoomDTO);

    @Named("licensePlateId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    LicensePlateDTO toDtoLicensePlateId(LicensePlate licensePlate);

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
