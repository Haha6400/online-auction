package com.mycompany.myapp.service.dto;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.enumeration.LicensePlateStatus;
import java.util.Objects;

public class CustomWinningBidResponse {

    private Long id;

    private String plateNumber;

    private LicensePlateStatus status;

    private String vehicleType;

    private String province;
    private float finalPrice;

    public float getFinalPrice() {
        return finalPrice;
    }

    public void setFinalPrice(float finalPrice) {
        this.finalPrice = finalPrice;
    }

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

    public LicensePlateStatus getStatus() {
        return status;
    }

    public void setStatus(LicensePlateStatus status) {
        this.status = status;
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

    public CustomWinningBidResponse(
        Long id,
        String plateNumber,
        LicensePlateStatus status,
        String vehicleType,
        String province,
        float finalPrice
    ) {
        this.id = id;
        this.plateNumber = plateNumber;
        this.status = status;
        this.vehicleType = vehicleType;
        this.province = province;
        this.finalPrice = finalPrice;
    }

    public CustomWinningBidResponse() {}

    public CustomWinningBidResponse licenseToCustom(LicensePlateDTO licensePlateDTO, float finalPrice) {
        return new CustomWinningBidResponse(
            licensePlateDTO.getId(),
            licensePlateDTO.getPlateNumber(),
            licensePlateDTO.getStatus(),
            licensePlateDTO.getVehicleType(),
            licensePlateDTO.getProvince(),
            finalPrice
        );
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof LicensePlateDTO)) {
            return false;
        }

        CustomWinningBidResponse customWinningBidResponse = (CustomWinningBidResponse) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, customWinningBidResponse.id);
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
            ", status='" + getStatus() + "'" +
            ", vehicleType='" + getVehicleType() + "'" +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
