package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Bid} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BidDTO {

    private Long id;

    private Instant eventTime;

    private Float priceBeforeBidding;

    private Float priceStep;

    private Float numberOfPriceStep;

    private UserDTO user;

    private AuctionRoomDTO auctionRoom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEventTime() {
        return eventTime;
    }

    public void setEventTime(Instant eventTime) {
        this.eventTime = eventTime;
    }

    public Float getPriceBeforeBidding() {
        return priceBeforeBidding;
    }

    public void setPriceBeforeBidding(Float priceBeforeBidding) {
        this.priceBeforeBidding = priceBeforeBidding;
    }

    public Float getPriceStep() {
        return priceStep;
    }

    public void setPriceStep(Float priceStep) {
        this.priceStep = priceStep;
    }

    public Float getNumberOfPriceStep() {
        return numberOfPriceStep;
    }

    public void setNumberOfPriceStep(Float numberOfPriceStep) {
        this.numberOfPriceStep = numberOfPriceStep;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public AuctionRoomDTO getAuctionRoom() {
        return auctionRoom;
    }

    public void setAuctionRoom(AuctionRoomDTO auctionRoom) {
        this.auctionRoom = auctionRoom;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BidDTO)) {
            return false;
        }

        BidDTO bidDTO = (BidDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, bidDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BidDTO{" +
            "id=" + getId() +
            ", eventTime='" + getEventTime() + "'" +
            ", priceBeforeBidding=" + getPriceBeforeBidding() +
            ", priceStep=" + getPriceStep() +
            ", numberOfPriceStep=" + getNumberOfPriceStep() +
            ", user=" + getUser() +
            ", auctionRoom=" + getAuctionRoom() +
            "}";
    }
}
