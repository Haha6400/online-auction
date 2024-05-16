package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.User;
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
    //    LicensePlate findAllByAuctionRoom_UsersWhere(User user);
}
