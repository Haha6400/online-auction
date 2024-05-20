package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.User;
import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the LicensePlate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LicensePlateRepository extends JpaRepository<LicensePlate, Long> {
    List<LicensePlate> findAllByOrderByCreatedDateDesc();
    List<LicensePlate> findAllByOrderByCreatedDateAsc();
}
