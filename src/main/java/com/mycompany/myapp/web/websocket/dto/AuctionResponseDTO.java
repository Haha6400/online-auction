package com.mycompany.myapp.web.websocket.dto;

import me.danhpb.myauction.web.websocket.dto.enumeration.AuctionResponseType;

public abstract class AuctionResponseDTO {
    private AuctionResponseType type;

    public AuctionResponseType getType() {
        return type;
    }

    public void setType(AuctionResponseType type) {
        this.type = type;
    }
}
