package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.hibernate.validator.constraints.UniqueElements;

/**
 * A Province.
 */
@Entity
@Table(name = "province")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @JsonIgnoreProperties(value = { "auctionRoom", "vehicleType", "province" }, allowSetters = true)
    //    @OneToOne(fetch = FetchType.LAZY, mappedBy = "province")
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "province")
    private Set<LicensePlate> licensePlate = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Province id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Province name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<LicensePlate> getLicensePlate() {
        return this.licensePlate;
    }

    public void setLicensePlate(Set<LicensePlate> licensePlate) {
        //        if (this.licensePlate != null) {
        //            this.licensePlate.setProvince(null);
        //        }
        //        if (licensePlate != null) {
        //            licensePlate.setProvince(this);
        //        }
        this.licensePlate = licensePlate;
    }

    public Province licensePlate(LicensePlate licensePlate) {
        //        this.setLicensePlate(licensePlate);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Province)) {
            return false;
        }
        return getId() != null && getId().equals(((Province) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Province{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
