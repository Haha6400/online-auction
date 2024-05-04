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

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "licensePlate")
    private AuctionRoom auctionRoom;

    @ManyToOne(fetch = FetchType.EAGER)
    private VehicleType vehicleType;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(
        name = "license_plate_province",
        joinColumns = { @JoinColumn(name = "license_plate_id") },
        inverseJoinColumns = { @JoinColumn(name = "province_name") }
    )
    private Province province;

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

    public VehicleType getVehicleType() {
        return this.vehicleType;
    }

    public void setVehicleType(VehicleType vehicleType) {
        this.vehicleType = vehicleType;
    }

    public LicensePlate vehicleType(VehicleType vehicleType) {
        this.setVehicleType(vehicleType);
        return this;
    }

    public Province getProvince() {
        return this.province;
    }

    public void setProvince(Province province) {
        this.province = province;
    }

    public LicensePlate province(Province province) {
        this.setProvince(province);
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
            "}";
    }
}