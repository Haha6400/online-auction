package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.AdminUserDTO;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.AuctionRoom}.
 */
public interface AuctionRoomService {
    /**
     * Save a auctionRoom.
     *
     * @param auctionRoomDTO the entity to save.
     * @return the persisted entity.
     */
    AuctionRoomDTO save(AuctionRoomDTO auctionRoomDTO);

    /**
     * Updates a auctionRoom.
     *
     * @param auctionRoomDTO the entity to update.
     * @return the persisted entity.
     */
    AuctionRoomDTO update(AuctionRoomDTO auctionRoomDTO);

    /**
     * Partially updates a auctionRoom.
     *
     * @param auctionRoomDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AuctionRoomDTO> partialUpdate(AuctionRoomDTO auctionRoomDTO);
    Optional<AuctionRoomDTO> addUserToAuctionRoom(Long id, UserDTO userDTO);

    List<AuctionRoomDTO> getAllByUser(UserDTO userDTO);
    /**
     * Get all the AuctionRoomDTO where WinningBid is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<AuctionRoomDTO> findAllWhereWinningBidIsNull();

    /**
     * Get all the auctionRooms with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AuctionRoomDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" auctionRoom.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AuctionRoomDTO> findOne(Long id);

    /**
     * Get the "plateNumber" auctionRoom.
     *
     * @param plateNumber the plateNumber of the entity.
     * @return the entity.
     */
    Optional<AuctionRoomDTO> findOneByLicensePlate(String plateNumber);

    /**
     * Delete the "id" auctionRoom.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    Page<AuctionRoomDTO> findAll(Pageable pageable);
}
