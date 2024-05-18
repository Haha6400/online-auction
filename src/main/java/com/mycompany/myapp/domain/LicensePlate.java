package com.mycompany.myapp.domain;

import com.mycompany.myapp.domain.enumeration.LicensePlateStatus;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A LicensePlate.
 */
@Entity
@Table(name = "license_plate")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class LicensePlate extends AbstractAuditingEntity<Long> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "plate_number")
    private String plateNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LicensePlateStatus status;

    @Column(name = "vehicle_type")
    private String vehicleType;

    @Column(name = "province")
    private String province;

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

    public LicensePlateStatus getStatus() {
        return this.status;
    }

    public LicensePlate status(LicensePlateStatus status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(LicensePlateStatus status) {
        this.status = status;
    }

    public String getVehicleType() {
        return this.vehicleType;
    }

    public LicensePlate vehicleType(String vehicleType) {
        this.setVehicleType(vehicleType);
        return this;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getProvince() {
        return this.province;
    }

    public LicensePlate province(String province) {
        this.setProvince(province);
        return this;
    }

    public void setProvince(String province) {
        this.province = province;
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
            ", status='" + getStatus() + "'" +
            ", vehicleType='" + getVehicleType() + "'" +
            ", province='" + getProvince() + "'" +
            "}";
    }
}
