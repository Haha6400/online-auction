package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Bid;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Bid entity.
 */
@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query("select bid from Bid bid where bid.user.login = ?#{authentication.name}")
    List<Bid> findByUserIsCurrentUser();

    default Optional<Bid> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Bid> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Bid> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(value = "select bid from Bid bid left join fetch bid.user", countQuery = "select count(bid) from Bid bid")
    Page<Bid> findAllWithToOneRelationships(Pageable pageable);

    @Query("select bid from Bid bid left join fetch bid.user")
    List<Bid> findAllWithToOneRelationships();

    @Query("select bid from Bid bid left join fetch bid.user where bid.id =:id")
    Optional<Bid> findOneWithToOneRelationships(@Param("id") Long id);
}
