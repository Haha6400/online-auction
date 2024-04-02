package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.WinningBid;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the WinningBid entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WinningBidRepository extends JpaRepository<WinningBid, Long> {}
