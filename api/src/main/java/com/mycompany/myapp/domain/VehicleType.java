package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A VehicleType.
 */
@Entity
@Table(name = "vehicle_type")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VehicleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @JsonIgnoreProperties(value = { "auctionRoom", "vehicleType", "province" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "vehicleType")
    private LicensePlate licensePlate;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public VehicleType id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public VehicleType name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LicensePlate getLicensePlate() {
        return this.licensePlate;
    }

    public void setLicensePlate(LicensePlate licensePlate) {
        if (this.licensePlate != null) {
            this.licensePlate.setVehicleType(null);
        }
        if (licensePlate != null) {
            licensePlate.setVehicleType(this);
        }
        this.licensePlate = licensePlate;
    }

    public VehicleType licensePlate(LicensePlate licensePlate) {
        this.setLicensePlate(licensePlate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VehicleType)) {
            return false;
        }
        return getId() != null && getId().equals(((VehicleType) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VehicleType{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}