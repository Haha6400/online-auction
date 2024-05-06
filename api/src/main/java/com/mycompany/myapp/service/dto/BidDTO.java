package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.Bid} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BidDTO implements Serializable {

    private Long id;

    private Long amount;

    private Instant timestamp;

    private UserDTO user;

    private AuctionRoomDTO auctionRoom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
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
            ", amount=" + getAmount() +
            ", timestamp='" + getTimestamp() + "'" +
            ", user=" + getUser() +
            ", auctionRoom=" + getAuctionRoom() +
            "}";
    }
}
