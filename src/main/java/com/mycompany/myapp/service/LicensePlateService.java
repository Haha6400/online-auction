package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.LicensePlateDTO;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.LicensePlate}.
 */
public interface LicensePlateService {
    /**
     * Save a licensePlate.
     *
     * @param licensePlateDTO the entity to save.
     * @return the persisted entity.
     */
    LicensePlateDTO save(LicensePlateDTO licensePlateDTO);

    /**
     * Updates a licensePlate.
     *
     * @param licensePlateDTO the entity to update.
     * @return the persisted entity.
     */
    LicensePlateDTO update(LicensePlateDTO licensePlateDTO);

    /**
     * Partially updates a licensePlate.
     *
     * @param licensePlateDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<LicensePlateDTO> partialUpdate(LicensePlateDTO licensePlateDTO);

    /**
     * Get all the licensePlates.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<LicensePlateDTO> findAll(Pageable pageable);

    /**
     * Get all the LicensePlateDTO where AuctionRoom is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<LicensePlateDTO> findAllWhereAuctionRoomIsNull();

    /**
     * Get the "id" licensePlate.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<LicensePlateDTO> findOne(Long id);

    /**
     * Delete the "id" licensePlate.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
