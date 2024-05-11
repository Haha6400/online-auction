package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LicensePlate;
import java.util.Optional;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LicensePlate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicensePlateRepository extends JpaRepository<LicensePlate, Long> {
    LicensePlate findLicensePlateByPlateNumber(String plateNumber);
}
