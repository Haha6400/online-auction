package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.WinningBidDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.WinningBid}.
 */
public interface WinningBidService {
    /**
     * Save a winningBid.
     *
     * @param winningBidDTO the entity to save.
     * @return the persisted entity.
     */
    WinningBidDTO save(WinningBidDTO winningBidDTO);

    /**
     * Updates a winningBid.
     *
     * @param winningBidDTO the entity to update.
     * @return the persisted entity.
     */
    WinningBidDTO update(WinningBidDTO winningBidDTO);

    /**
     * Partially updates a winningBid.
     *
     * @param winningBidDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WinningBidDTO> partialUpdate(WinningBidDTO winningBidDTO);

    /**
     * Get all the winningBids.
     *
     * @return the list of entities.
     */
    List<WinningBidDTO> findAll();

    /**
     * Get the "id" winningBid.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WinningBidDTO> findOne(Long id);

    /**
     * Delete the "id" winningBid.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}