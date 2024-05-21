package com.mycompany.myapp.web.websocket.dto;

import me.danhpb.myauction.service.dto.BidDTO;
import me.danhpb.myauction.web.websocket.dto.enumeration.AuctionResponseType;

public class UpdateBidResponseDTO extends AuctionResponseDTO {
    private BidDTO bid;

    public UpdateBidResponseDTO() {
        setType(AuctionResponseType.UPDATE_BID);
    }

    public BidDTO getBid() {
        return bid;
    }

    public void setBid(BidDTO bid) {
        this.bid = bid;
    }
}
