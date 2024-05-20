package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.domain.WinningBid;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.service.dto.WinningBidDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link WinningBid} and its DTO {@link WinningBidDTO}.
 */
@Mapper(componentModel = "spring")
public interface WinningBidMapper extends EntityMapper<WinningBidDTO, WinningBid> {
    @Mapping(target = "bid", source = "bid")
    @Mapping(target = "auctionRoom", source = "auctionRoom")
    WinningBidDTO toDto(WinningBid s);

    @Named("bidId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BidDTO toDtoBidId(Bid bid);

    @Named("auctionRoomId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    AuctionRoomDTO toDtoAuctionRoomId(AuctionRoom auctionRoom);
}
