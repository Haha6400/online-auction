package com.mycompany.myapp.service.dto;

import java.util.List;
import java.util.Objects;

public class AuctionRoomWSDTO extends AuctionRoomDTO{
    private List<BidDTO> bids;


    public List<BidDTO> getBids() {
        return bids;
    }

    public void setBids(List<BidDTO> bids) {
        this.bids = bids;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuctionRoomWSDTO)) {
            return false;
        }

        AuctionRoomWSDTO auctionRoomWSDTO = (AuctionRoomWSDTO) o;
        if (getId() == null) {
            return false;
        }
        return Objects.equals(getId(), auctionRoomWSDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuctionRoomDTO{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", initialPrice=" + getInitialPrice() +
            ", priceStep=" + getPriceStep() +
            ", licensePlate='" + getLicensePlate() + "'" +
            ", bids='" + getBids() + "'" +
            "}";
    }
}
