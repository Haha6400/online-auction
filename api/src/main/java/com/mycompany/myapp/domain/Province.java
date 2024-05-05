package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Province.
 */
@Entity
@Table(name = "province")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Province {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "province")
    private Set<LicensePlate> licensePlates = new HashSet<>();

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

    public Set<LicensePlate> getLicensePlates() {
        return this.licensePlates;
    }

    public void setLicensePlates(Set<LicensePlate> licensePlates) {
        if (this.licensePlates != null) {
            this.licensePlates.forEach(i -> i.setProvince(null));
        }
        if (licensePlates != null) {
            licensePlates.forEach(i -> i.setProvince(this));
        }
        this.licensePlates = licensePlates;
    }

    public Province licensePlates(Set<LicensePlate> licensePlates) {
        this.setLicensePlates(licensePlates);
        return this;
    }

    public Province addLicensePlate(LicensePlate licensePlate) {
        this.licensePlates.add(licensePlate);
        licensePlate.setProvince(this);
        return this;
    }

    public Province removeLicensePlate(LicensePlate licensePlate) {
        this.licensePlates.remove(licensePlate);
        licensePlate.setProvince(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and
    // setters here

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
        // see
        // https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
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
