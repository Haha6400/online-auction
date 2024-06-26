package com.mycompany.myapp.web.websocket.dto;

import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.web.websocket.dto.enumeration.AuctionResponseType;

public class BidResponseDTO extends AuctionResponseDTO {
    private BidDTO bid;

    public BidResponseDTO() {
        setType(AuctionResponseType.BID_SUCCESS);
    }

    public BidDTO getBid() {
        return bid;
    }

    public void setBid(BidDTO bid) {
        this.bid = bid;
    }
}
