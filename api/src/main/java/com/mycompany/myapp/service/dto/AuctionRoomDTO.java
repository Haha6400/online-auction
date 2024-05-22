package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.AuctionRoom} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AuctionRoomDTO {

    private Long id;

    private String description;

    private Instant startTime;

    private Instant endTime;

    private Float initialPrice;

    private Float priceStep;

    private LicensePlateDTO licensePlate;
    private UserDTO winner;
    private Float finalPrice;

    public UserDTO getWinner() {
        return winner;
    }

    public void setWinner(UserDTO winner) {
        this.winner = winner;
    }

    public Float getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(Float finalPrice) {
        this.finalPrice = finalPrice;
    }

    private Set<UserDTO> users = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public Float getInitialPrice() {
        return initialPrice;
    }

    public void setInitialPrice(Float initialPrice) {
        this.initialPrice = initialPrice;
    }

    public Float getPriceStep() {
        return priceStep;
    }

    public void setPriceStep(Float priceStep) {
        this.priceStep = priceStep;
    }

    public LicensePlateDTO getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(LicensePlateDTO licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Set<UserDTO> getUsers() {
        return users;
    }

    public void setUsers(Set<UserDTO> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AuctionRoomDTO)) {
            return false;
        }

        AuctionRoomDTO auctionRoomDTO = (AuctionRoomDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, auctionRoomDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AuctionRoomDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", initialPrice=" + getInitialPrice() +
            ", priceStep=" + getPriceStep() +
            ", licensePlate=" + getLicensePlate() +
            ", users=" + getUsers() +
            "}";
    }
}
