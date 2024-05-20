package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.enumeration.PaymentStatus;
import com.mycompany.myapp.service.dto.CustomWinningBidResponse;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.UserDTO;
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
    Optional<WinningBidDTO> partialUpdate(WinningBidDTO winningBidDTO, Long id);

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
    List<CustomWinningBidResponse> findAllWinningLicenseByUsers(UserDTO userDTO);
    List<CustomWinningBidResponse> findAllWinningLicenseByStatus(UserDTO userDTO, PaymentStatus paymentStatus);
}
