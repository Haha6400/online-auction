package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.VehicleType} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VehicleTypeDTO implements Serializable {

    private Long id;

    private Long vehicleTypeID;

    private String name;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVehicleTypeID() {
        return vehicleTypeID;
    }

    public void setVehicleTypeID(Long vehicleTypeID) {
        this.vehicleTypeID = vehicleTypeID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VehicleTypeDTO)) {
            return false;
        }

        VehicleTypeDTO vehicleTypeDTO = (VehicleTypeDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, vehicleTypeDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VehicleTypeDTO{" +
            "id=" + getId() +
            ", vehicleTypeID=" + getVehicleTypeID() +
            ", name='" + getName() + "'" +
            "}";
    }
}
