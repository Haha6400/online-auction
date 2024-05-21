package com.mycompany.myapp.web.websocket.dto;

import me.danhpb.myauction.service.dto.WinningBidDTO;
import me.danhpb.myauction.web.websocket.dto.enumeration.AuctionResponseType;

public class WinningBidResponseDTO extends AuctionResponseDTO{

    public WinningBidResponseDTO() {
        setType(AuctionResponseType.WINNING_BID);
    }

    private WinningBidDTO winningBidDTO;

    public WinningBidDTO getWinningBidDTO() {
        return winningBidDTO;
    }

    public void setWinningBidDTO(WinningBidDTO winningBidDTO) {
        this.winningBidDTO = winningBidDTO;
    }
}
