package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A AuctionRoom.
 */
@Entity
@Table(name = "auction_room")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AuctionRoom implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "start_time")
    private Instant startTime;

    @Column(name = "end_time")
    private Instant endTime;

    @Column(name = "init_price")
    private Long initPrice;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "auctionRoom")
    @JsonIgnoreProperties(value = { "user", "winningBid", "auctionRoom" }, allowSetters = true)
    private Set<Bid> bids = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "rel_auction_room__user",
        joinColumns = @JoinColumn(name = "auction_room_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @JsonIgnoreProperties(value = { "auctionRoom", "bid" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "auctionRoom")
    private WinningBid winningBid;

    @JsonIgnoreProperties(value = { "auctionRoom", "vehicleType", "province" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "auctionRoom")
    private LicensePlate licensePlate;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AuctionRoom id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return this.description;
    }

    public AuctionRoom description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getStartTime() {
        return this.startTime;
    }

    public AuctionRoom startTime(Instant startTime) {
        this.setStartTime(startTime);
        return this;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return this.endTime;
    }

    public AuctionRoom endTime(Instant endTime) {
        this.setEndTime(endTime);
        return this;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public Long getInitPrice() {
        return this.initPrice;
    }

    public AuctionRoom initPrice(Long initPrice) {
        this.setInitPrice(initPrice);
        return this;
    }

    public void setInitPrice(Long initPrice) {
        this.initPrice = initPrice;
    }

    public Set<Bid> getBids() {
        return this.bids;
    }

    public void setBids(Set<Bid> bids) {
        if (this.bids != null) {
            this.bids.forEach(i -> i.setAuctionRoom(null));
        }
        if (bids != null) {
            bids.forEach(i -> i.setAuctionRoom(this));
        }
        this.bids = bids;
    }

    public AuctionRoom bids(Set<Bid> bids) {
        this.setBids(bids);
        return this;
    }

    public AuctionRoom addBid(Bid bid) {
        this.bids.add(bid);
        bid.setAuctionRoom(this);
        return this;
    }

    public AuctionRoom removeBid(Bid bid) {
        this.bids.remove(bid);
        bid.setAuctionRoom(null);
        return this;
    }

    public Set<User> getUsers() {
        return this.users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public AuctionRoom users(Set<User> users) {
        this.setUsers(users);
        return this;
    }

    public AuctionRoom addUser(User user) {
        this.users.add(user);
        return this;
    }

    public AuctionRoom removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public WinningBid getWinningBid() {
        return this.winningBid;
    }

    public void setWinningBid(WinningBid winningBid) {
        if (this.winningBid != null) {
            this.winningBid.setAuctionRoom(null);
        }
        if (winningBid != null) {
            winningBid.setAuctionRoom(this);
        }
        this.winningBid = winningBid;
    }

    public AuctionRoom winningBid(WinningBid winningBid) {
        this.setWinningBid(winningBid);
        return this;
    }

    public LicensePlate getLicensePlate() {
        return this.licensePlate;
    }

    public void setLicensePlate(LicensePlate licensePlate) {
        if (this.licensePlate != null) {
            this.licensePlate.setAuctionRoom(null);
        }
        if (licensePlate != null) {
            licensePlate.setAuctionRoom(this);
        }
        this.licensePlate = licensePlate;
    }

    public AuctionRoom licensePlate(LicensePlate licensePlate) {
        this.setLicensePlate(licensePlate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuctionRoom)) {
            return false;
        }
        return getId() != null && getId().equals(((AuctionRoom) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuctionRoom{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", initPrice=" + getInitPrice() +
            "}";
    }
}
