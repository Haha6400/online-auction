package com.mycompany.myapp.web.websocket.dto;


import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.web.websocket.dto.enumeration.AuctionResponseType;

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
