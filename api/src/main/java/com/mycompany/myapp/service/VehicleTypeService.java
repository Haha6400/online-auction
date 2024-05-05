package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.VehicleType}.
 */
public interface VehicleTypeService {
    /**
     * Save a vehicleType.
     *
     * @param vehicleTypeDTO the entity to save.
     * @return the persisted entity.
     */
    VehicleTypeDTO save(VehicleTypeDTO vehicleTypeDTO);

    /**
     * Updates a vehicleType.
     *
     * @param vehicleTypeDTO the entity to update.
     * @return the persisted entity.
     */
    VehicleTypeDTO update(VehicleTypeDTO vehicleTypeDTO);

    /**
     * Partially updates a vehicleType.
     *
     * @param vehicleTypeDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<VehicleTypeDTO> partialUpdate(VehicleTypeDTO vehicleTypeDTO);

    /**
     * Get all the vehicleTypes.
     *
     * @return the list of entities.
     */
    List<VehicleTypeDTO> findAll();

    /**
     * Get the "id" vehicleType.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VehicleTypeDTO> findOne(Long id);

    /**
     * Delete the "id" vehicleType.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
