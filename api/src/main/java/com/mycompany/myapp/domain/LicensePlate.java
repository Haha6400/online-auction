package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A LicensePlate.
 */
@Entity
@Table(name = "license_plate")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LicensePlate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "plate_number")
    private String plateNumber;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "province_")
    private String province;

    @JsonIgnoreProperties(value = { "licensePlate", "bids", "users", "winningBid" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "licensePlate")
    private AuctionRoom auctionRoom;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public LicensePlate id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlateNumber() {
        return this.plateNumber;
    }

    public LicensePlate plateNumber(String plateNumber) {
        this.setPlateNumber(plateNumber);
        return this;
    }

    public void setPlateNumber(String plateNumber) {
        this.plateNumber = plateNumber;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public AuctionRoom getAuctionRoom() {
        return this.auctionRoom;
    }

    public void setAuctionRoom(AuctionRoom auctionRoom) {
        if (this.auctionRoom != null) {
            this.auctionRoom.setLicensePlate(null);
        }
        if (auctionRoom != null) {
            auctionRoom.setLicensePlate(this);
        }
        this.auctionRoom = auctionRoom;
    }

    public LicensePlate auctionRoom(AuctionRoom auctionRoom) {
        this.setAuctionRoom(auctionRoom);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LicensePlate)) {
            return false;
        }
        return getId() != null && getId().equals(((LicensePlate) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LicensePlate{" +
            "id=" + getId() +
            ", plateNumber='" + getPlateNumber() + "'" +
            ", vehicleType='" + getVehicleType() + "'" +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
