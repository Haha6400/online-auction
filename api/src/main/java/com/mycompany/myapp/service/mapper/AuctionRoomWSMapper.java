package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.service.dto.AuctionRoomWSDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuctionRoomWSMapper extends EntityMapper<AuctionRoomWSDTO, AuctionRoom> {
}
