package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.BidDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Bid}.
 */
public interface BidService {
    /**
     * Save a bid.
     *
     * @param bidDTO the entity to save.
     * @return the persisted entity.
     */
    BidDTO save(BidDTO bidDTO);

    /**
     * Updates a bid.
     *
     * @param bidDTO the entity to update.
     * @return the persisted entity.
     */
    BidDTO update(BidDTO bidDTO);

    /**
     * Partially updates a bid.
     *
     * @param bidDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<BidDTO> partialUpdate(BidDTO bidDTO);

    /**
     * Get all the bids.
     *
     * @return the list of entities.
     */
    List<BidDTO> findAll();

    /**
     * Get all the BidDTO where WinningBid is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<BidDTO> findAllWhereWinningBidIsNull();

    /**
     * Get all the bids with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<BidDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" bid.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<BidDTO> findOne(Long id);

    /**
     * Delete the "id" bid.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
