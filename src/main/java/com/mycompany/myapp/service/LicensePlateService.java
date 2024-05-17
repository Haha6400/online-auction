package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.LicensePlateDTO;
import java.util.List;
import java.util.Optional;

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
     * @return the list of entities.
     */
    List<LicensePlateDTO> findAll();

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
