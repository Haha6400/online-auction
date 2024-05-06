package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Bid} and its DTO {@link BidDTO}.
 */
@Mapper(componentModel = "spring")
public interface BidMapper extends EntityMapper<BidDTO, Bid> {
    @Mapping(target = "user", source = "user")
    @Mapping(target = "auctionRoom", source = "auctionRoom")
    BidDTO toDto(Bid s);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);

    @Named("auctionRoomId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AuctionRoomDTO toDtoAuctionRoomId(AuctionRoom auctionRoom);
}
