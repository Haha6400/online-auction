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
public class AuctionRoomDTO implements Serializable {

    private Long id;

    private String description;

    private Instant startTime;

    private Instant endTime;

    private Long initPrice;

    private LicensePlateDTO licensePlate;

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

    public Long getInitPrice() {
        return initPrice;
    }

    public void setInitPrice(Long initPrice) {
        this.initPrice = initPrice;
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
            ", initPrice=" + getInitPrice() +
            ", licensePlate=" + getLicensePlate() +
            ", users=" + getUsers() +
            "}";
    }
}
