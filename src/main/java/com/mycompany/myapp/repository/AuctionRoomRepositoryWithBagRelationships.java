package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AuctionRoom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface AuctionRoomRepositoryWithBagRelationships {
    Optional<AuctionRoom> fetchBagRelationships(Optional<AuctionRoom> auctionRoom);

    List<AuctionRoom> fetchBagRelationships(List<AuctionRoom> auctionRooms);

    Page<AuctionRoom> fetchBagRelationships(Page<AuctionRoom> auctionRooms);
}
