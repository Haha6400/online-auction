package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "vehicleType")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private Set<LicensePlate> licensePlates = new HashSet<>();

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

    public Set<LicensePlate> getLicensePlates() {
        return this.licensePlates;
    }

    public void setLicensePlates(Set<LicensePlate> licensePlates) {
        if (this.licensePlates != null) {
            this.licensePlates.forEach(i -> i.setVehicleType(null));
        }
        if (licensePlates != null) {
            licensePlates.forEach(i -> i.setVehicleType(this));
        }
        this.licensePlates = licensePlates;
    }

    public VehicleType licensePlates(Set<LicensePlate> licensePlates) {
        this.setLicensePlates(licensePlates);
        return this;
    }

    public VehicleType addLicensePlate(LicensePlate licensePlate) {
        this.licensePlates.add(licensePlate);
        licensePlate.setVehicleType(this);
        return this;
    }

    public VehicleType removeLicensePlate(LicensePlate licensePlate) {
        this.licensePlates.remove(licensePlate);
        licensePlate.setVehicleType(null);
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
