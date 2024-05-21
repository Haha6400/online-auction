package com.mycompany.myapp.web.websocket.dto;

import com.mycompany.myapp.service.dto.AuctionRoomWSDTO;
import com.mycompany.myapp.web.websocket.dto.enumeration.AuctionResponseType;

public class AuctionRoomInitializeResponseDTO extends AuctionResponseDTO{
    private AuctionRoomWSDTO auctionRoom;

    public AuctionRoomInitializeResponseDTO() {
        setType(AuctionResponseType.INITIALIZE_AUCTION_ROOM_DATA);
    }

    public AuctionRoomWSDTO getAuctionRoom() {
        return auctionRoom;
    }

    public void setAuctionRoom(AuctionRoomWSDTO auctionRoom) {
        this.auctionRoom = auctionRoom;
    }
}
