package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.mycompany.myapp.domain.LicensePlate} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LicensePlateDTO {

    private Long id;

    private String plateNumber;

    private String vehicleType;

    private String province;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPlateNumber() {
        return plateNumber;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LicensePlateDTO)) {
            return false;
        }

        LicensePlateDTO licensePlateDTO = (LicensePlateDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, licensePlateDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "LicensePlateDTO{" +
            "id=" + getId() +
            ", plateNumber='" + getPlateNumber() + "'" +
            ", vehicleType='" + getVehicleType() + "'" +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
