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
public class Bid implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "amount")
    private Long amount;

    @Column(name = "timestamp")
    private Instant timestamp;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JsonIgnoreProperties(value = { "auctionRoom", "bid" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "bid")
    private WinningBid winningBid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "bids", "users", "winningBid", "licensePlate" }, allowSetters = true)
    private AuctionRoom auctionRoom;

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

    public Long getAmount() {
        return this.amount;
    }

    public Bid amount(Long amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Instant getTimestamp() {
        return this.timestamp;
    }

    public Bid timestamp(Instant timestamp) {
        this.setTimestamp(timestamp);
        return this;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
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
            ", amount=" + getAmount() +
            ", timestamp='" + getTimestamp() + "'" +
            "}";
    }
}
