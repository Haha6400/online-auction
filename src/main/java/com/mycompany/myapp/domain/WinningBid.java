package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A WinningBid.
 */
@Entity
@Table(name = "winning_bid")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WinningBid implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "payment_status")
    private Boolean paymentStatus;

    @JsonIgnoreProperties(value = { "licensePlate", "bids", "users", "winningBid" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private AuctionRoom auctionRoom;

    @JsonIgnoreProperties(value = { "user", "winningBid", "auctionRoom" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Bid bid;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public WinningBid id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getPaymentStatus() {
        return this.paymentStatus;
    }

    public WinningBid paymentStatus(Boolean paymentStatus) {
        this.setPaymentStatus(paymentStatus);
        return this;
    }

    public void setPaymentStatus(Boolean paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public AuctionRoom getAuctionRoom() {
        return this.auctionRoom;
    }

    public void setAuctionRoom(AuctionRoom auctionRoom) {
        this.auctionRoom = auctionRoom;
    }

    public WinningBid auctionRoom(AuctionRoom auctionRoom) {
        this.setAuctionRoom(auctionRoom);
        return this;
    }

    public Bid getBid() {
        return this.bid;
    }

    public void setBid(Bid bid) {
        this.bid = bid;
    }

    public WinningBid bid(Bid bid) {
        this.setBid(bid);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof WinningBid)) {
            return false;
        }
        return getId() != null && getId().equals(((WinningBid) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "WinningBid{" +
            "id=" + getId() +
            ", paymentStatus='" + getPaymentStatus() + "'" +
            "}";
    }
}
