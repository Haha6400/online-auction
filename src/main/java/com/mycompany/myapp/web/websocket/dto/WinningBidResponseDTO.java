package com.mycompany.myapp.web.websocket.dto;

import com.mycompany.myapp.service.dto.WinningBidDTO;
import com.mycompany.myapp.web.websocket.dto.enumeration.AuctionResponseType;

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
