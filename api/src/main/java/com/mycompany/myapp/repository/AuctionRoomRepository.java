package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.service.dto.AdminUserDTO;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the AuctionRoom entity.
 *
 * When extending this class, extend AuctionRoomRepositoryWithBagRelationships too.
 * For more information refer to https://github.com/jhipster/generator-jhipster/issues/17990.
 */
@Repository
public interface AuctionRoomRepository extends AuctionRoomRepositoryWithBagRelationships, JpaRepository<AuctionRoom, Long> {
    default Optional<AuctionRoom> findOneWithEagerRelationships(Long id) {
        return this.fetchBagRelationships(this.findById(id));
    }

    default List<AuctionRoom> findAllWithEagerRelationships() {
        return this.fetchBagRelationships(this.findAll());
    }

    default Page<AuctionRoom> findAllWithEagerRelationships(Pageable pageable) {
        return this.fetchBagRelationships(this.findAll(pageable));
    }

    Optional<AuctionRoom> findAuctionRoomByLicensePlate(LicensePlate licensePlate);

    List<AuctionRoom> findAllByUsers(User user);
    List<AuctionRoom> findAllByUsersAndEndTimeBefore(User user, Instant date);
    List<AuctionRoom> findAllByUsersAndStartTimeAfter(User user, Instant date);
    List<AuctionRoom> findAllByUsersAndStartTimeBeforeAndEndTimeAfterOrderByStartTimeDesc(User user, Instant start, Instant end);

    List<AuctionRoom> findAllByUsersOrderByCreatedDateDesc(User user);
    //    List<AuctionRoom> findAllByUsersAndWinningBid(User user);
}
