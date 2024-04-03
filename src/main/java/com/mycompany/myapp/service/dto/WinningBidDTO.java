package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.WinningBid} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WinningBidDTO implements Serializable {

    private Long id;

    private Boolean paymentStatus;

    private AuctionRoomDTO auctionRoom;

    private BidDTO bid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(Boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public AuctionRoomDTO getAuctionRoom() {
        return auctionRoom;
    }

    public void setAuctionRoom(AuctionRoomDTO auctionRoom) {
        this.auctionRoom = auctionRoom;
    }

    public BidDTO getBid() {
        return bid;
    }

    public void setBid(BidDTO bid) {
        this.bid = bid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WinningBidDTO)) {
            return false;
        }

        WinningBidDTO winningBidDTO = (WinningBidDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, winningBidDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WinningBidDTO{" +
            "id=" + getId() +
            ", paymentStatus='" + getPaymentStatus() + "'" +
            ", auctionRoom=" + getAuctionRoom() +
            ", bid=" + getBid() +
            "}";
    }
}
