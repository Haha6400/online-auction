package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AuctionRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class AuctionRoomRepositoryWithBagRelationshipsImpl implements AuctionRoomRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String AUCTIONROOMS_PARAMETER = "auctionRooms";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<AuctionRoom> fetchBagRelationships(Optional<AuctionRoom> auctionRoom) {
        return auctionRoom.map(this::fetchUsers);
    }

    @Override
    public Page<AuctionRoom> fetchBagRelationships(Page<AuctionRoom> auctionRooms) {
        return new PageImpl<>(
            fetchBagRelationships(auctionRooms.getContent()),
            auctionRooms.getPageable(),
            auctionRooms.getTotalElements()
        );
    }

    @Override
    public List<AuctionRoom> fetchBagRelationships(List<AuctionRoom> auctionRooms) {
        return Optional.of(auctionRooms).map(this::fetchUsers).orElse(Collections.emptyList());
    }

    AuctionRoom fetchUsers(AuctionRoom result) {
        return entityManager
            .createQuery(
                "select auctionRoom from AuctionRoom auctionRoom left join fetch auctionRoom.users where auctionRoom.id = :id",
                AuctionRoom.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<AuctionRoom> fetchUsers(List<AuctionRoom> auctionRooms) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, auctionRooms.size()).forEach(index -> order.put(auctionRooms.get(index).getId(), index));
        List<AuctionRoom> result = entityManager
            .createQuery(
                "select auctionRoom from AuctionRoom auctionRoom left join fetch auctionRoom.users where auctionRoom in :auctionRooms",
                AuctionRoom.class
            )
            .setParameter(AUCTIONROOMS_PARAMETER, auctionRooms)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
