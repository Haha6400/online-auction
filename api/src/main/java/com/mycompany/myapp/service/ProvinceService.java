package com.mycompany.myapp.service;

import com.mycompany.myapp.service.dto.ProvinceDTO;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Province}.
 */
public interface ProvinceService {
    /**
     * Save a province.
     *
     * @param provinceDTO the entity to save.
     * @return the persisted entity.
     */
    ProvinceDTO save(ProvinceDTO provinceDTO);

    /**
     * Updates a province.
     *
     * @param provinceDTO the entity to update.
     * @return the persisted entity.
     */
    ProvinceDTO update(ProvinceDTO provinceDTO);

    /**
     * Partially updates a province.
     *
     * @param provinceDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<ProvinceDTO> partialUpdate(ProvinceDTO provinceDTO);

    /**
     * Get all the provinces.
     *
     * @return the list of entities.
     */
    List<ProvinceDTO> findAll();

    /**
     * Get all the ProvinceDTO where LicensePlate is {@code null}.
     *
     * @return the {@link List} of entities.
     */
    List<ProvinceDTO> findAllWhereLicensePlateIsNull();

    /**
     * Get the "id" province.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ProvinceDTO> findOne(Long id);

    /**
     * Delete the "id" province.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}