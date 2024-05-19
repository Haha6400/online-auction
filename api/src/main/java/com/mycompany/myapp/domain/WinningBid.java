package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.PaymentStatus;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A WinningBid.
 */
@Entity
@Table(name = "winning_bid")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class WinningBid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private PaymentStatus paymentStatus;

    @JsonIgnoreProperties(value = { "user", "auctionRoom", "winningBid" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private Bid bid;

    @JsonIgnoreProperties(value = { "bids", "licensePlate", "users", "winningBid" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private AuctionRoom auctionRoom;

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

    public PaymentStatus getPaymentStatus() {
        return this.paymentStatus;
    }

    public WinningBid paymentStatus(PaymentStatus paymentStatus) {
        this.setPaymentStatus(paymentStatus);
        return this;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
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
