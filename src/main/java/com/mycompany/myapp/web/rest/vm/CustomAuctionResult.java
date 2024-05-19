package com.mycompany.myapp.web.rest.vm;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.WinningBid;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.service.dto.WinningBidDTO;

public class CustomAuctionResult {

    @JsonIgnoreProperties("users")
    private AuctionRoomDTO auctionRoomDTO;

    private UserDTO winner;
    private Float finalPrice;

    public CustomAuctionResult() {}

    public CustomAuctionResult(AuctionRoomDTO auctionRoomDTO, UserDTO winner, Float finalPrice) {
        this.auctionRoomDTO = auctionRoomDTO;
        this.winner = winner;
        this.finalPrice = finalPrice;
    }

    public AuctionRoomDTO getAuctionRoomDTO() {
        return auctionRoomDTO;
    }

    public void setAuctionRoomDTO(AuctionRoomDTO auctionRoomDTO) {
        this.auctionRoomDTO = auctionRoomDTO;
    }

    @JsonProperty("winner")
    public UserDTO getUserDTO() {
        return winner;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.winner = userDTO;
    }

    public Float getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Float finalPrice) {
        this.finalPrice = finalPrice;
    }
}
