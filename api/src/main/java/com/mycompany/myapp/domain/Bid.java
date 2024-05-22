package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;

/**
 * A Bid.
 */
@Entity
@Table(name = "bid")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "event_time")
    private Instant eventTime;

    @Column(name = "price_before_bidding")
    private Float priceBeforeBidding;

    @Column(name = "price_step")
    private Float priceStep;

    @Column(name = "number_of_price_step")
    private Float numberOfPriceStep;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JsonIgnoreProperties(value = { "bids", "licensePlate", "users", "winningBid" }, allowSetters = true)
    private AuctionRoom auctionRoom;

    @JsonIgnoreProperties(value = { "bid", "auctionRoom" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "bid")
    private WinningBid winningBid;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Bid id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getEventTime() {
        return this.eventTime;
    }

    public Bid eventTime(Instant eventTime) {
        this.setEventTime(eventTime);
        return this;
    }

    public void setEventTime(Instant eventTime) {
        this.eventTime = eventTime;
    }

    public Float getPriceBeforeBidding() {
        return this.priceBeforeBidding;
    }

    public Bid priceBeforeBidding(Float priceBeforeBidding) {
        this.setPriceBeforeBidding(priceBeforeBidding);
        return this;
    }

    public void setPriceBeforeBidding(Float priceBeforeBidding) {
        this.priceBeforeBidding = priceBeforeBidding;
    }

    public Float getPriceStep() {
        return this.priceStep;
    }

    public Bid priceStep(Float priceStep) {
        this.setPriceStep(priceStep);
        return this;
    }

    public void setPriceStep(Float priceStep) {
        this.priceStep = priceStep;
    }

    public Float getNumberOfPriceStep() {
        return this.numberOfPriceStep;
    }

    public Bid numberOfPriceStep(Float numberOfPriceStep) {
        this.setNumberOfPriceStep(numberOfPriceStep);
        return this;
    }

    public void setNumberOfPriceStep(Float numberOfPriceStep) {
        this.numberOfPriceStep = numberOfPriceStep;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Bid user(User user) {
        this.setUser(user);
        return this;
    }

    public AuctionRoom getAuctionRoom() {
        return this.auctionRoom;
    }

    public void setAuctionRoom(AuctionRoom auctionRoom) {
        this.auctionRoom = auctionRoom;
    }

    public Bid auctionRoom(AuctionRoom auctionRoom) {
        this.setAuctionRoom(auctionRoom);
        return this;
    }

    public WinningBid getWinningBid() {
        return this.winningBid;
    }

    public void setWinningBid(WinningBid winningBid) {
        if (this.winningBid != null) {
            this.winningBid.setBid(null);
        }
        if (winningBid != null) {
            winningBid.setBid(this);
        }
        this.winningBid = winningBid;
    }

    public Bid winningBid(WinningBid winningBid) {
        this.setWinningBid(winningBid);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bid)) {
            return false;
        }
        return getId() != null && getId().equals(((Bid) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bid{" +
            "id=" + getId() +
            ", eventTime='" + getEventTime() + "'" +
            ", priceBeforeBidding=" + getPriceBeforeBidding() +
            ", priceStep=" + getPriceStep() +
            ", numberOfPriceStep=" + getNumberOfPriceStep() +
            "}";
    }
}
