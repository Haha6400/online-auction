package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.VehicleTypeRepository;
import com.mycompany.myapp.service.VehicleTypeService;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.VehicleType}.
 */
@RestController
@RequestMapping("/api/vehicle-types")
public class VehicleTypeResource {

    private final Logger log = LoggerFactory.getLogger(VehicleTypeResource.class);

    private static final String ENTITY_NAME = "vehicleType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VehicleTypeService vehicleTypeService;

    private final VehicleTypeRepository vehicleTypeRepository;

    public VehicleTypeResource(VehicleTypeService vehicleTypeService, VehicleTypeRepository vehicleTypeRepository) {
        this.vehicleTypeService = vehicleTypeService;
        this.vehicleTypeRepository = vehicleTypeRepository;
    }

    /**
     * {@code POST  /vehicle-types} : Create a new vehicleType.
     *
     * @param vehicleTypeDTO the vehicleTypeDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new vehicleTypeDTO, or with status {@code 400 (Bad Request)} if the vehicleType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<VehicleTypeDTO> createVehicleType(@RequestBody VehicleTypeDTO vehicleTypeDTO) throws URISyntaxException {
        log.debug("REST request to save VehicleType : {}", vehicleTypeDTO);
        if (vehicleTypeDTO.getId() != null) {
            throw new BadRequestAlertException("A new vehicleType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        vehicleTypeDTO = vehicleTypeService.save(vehicleTypeDTO);
        return ResponseEntity.created(new URI("/api/vehicle-types/" + vehicleTypeDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, vehicleTypeDTO.getId().toString()))
            .body(vehicleTypeDTO);
    }

    /**
     * {@code PUT  /vehicle-types/:id} : Updates an existing vehicleType.
     *
     * @param id the id of the vehicleTypeDTO to save.
     * @param vehicleTypeDTO the vehicleTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleTypeDTO,
     * or with status {@code 400 (Bad Request)} if the vehicleTypeDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the vehicleTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<VehicleTypeDTO> updateVehicleType(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VehicleTypeDTO vehicleTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to update VehicleType : {}, {}", id, vehicleTypeDTO);
        if (vehicleTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vehicleTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vehicleTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        vehicleTypeDTO = vehicleTypeService.update(vehicleTypeDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vehicleTypeDTO.getId().toString()))
            .body(vehicleTypeDTO);
    }

    /**
     * {@code PATCH  /vehicle-types/:id} : Partial updates given fields of an existing vehicleType, field will ignore if it is null
     *
     * @param id the id of the vehicleTypeDTO to save.
     * @param vehicleTypeDTO the vehicleTypeDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated vehicleTypeDTO,
     * or with status {@code 400 (Bad Request)} if the vehicleTypeDTO is not valid,
     * or with status {@code 404 (Not Found)} if the vehicleTypeDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the vehicleTypeDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VehicleTypeDTO> partialUpdateVehicleType(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VehicleTypeDTO vehicleTypeDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update VehicleType partially : {}, {}", id, vehicleTypeDTO);
        if (vehicleTypeDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, vehicleTypeDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!vehicleTypeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VehicleTypeDTO> result = vehicleTypeService.partialUpdate(vehicleTypeDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, vehicleTypeDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /vehicle-types} : get all the vehicleTypes.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of vehicleTypes in body.
     */
    @GetMapping("")
    public List<VehicleTypeDTO> getAllVehicleTypes(@RequestParam(name = "filter", required = false) String filter) {
        if ("licenseplate-is-null".equals(filter)) {
            log.debug("REST request to get all VehicleTypes where licensePlate is null");
            return vehicleTypeService.findAllWhereLicensePlateIsNull();
        }
        log.debug("REST request to get all VehicleTypes");
        return vehicleTypeService.findAll();
    }

    /**
     * {@code GET  /vehicle-types/:id} : get the "id" vehicleType.
     *
     * @param id the id of the vehicleTypeDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the vehicleTypeDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<VehicleTypeDTO> getVehicleType(@PathVariable("id") Long id) {
        log.debug("REST request to get VehicleType : {}", id);
        Optional<VehicleTypeDTO> vehicleTypeDTO = vehicleTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(vehicleTypeDTO);
    }

    /**
     * {@code DELETE  /vehicle-types/:id} : delete the "id" vehicleType.
     *
     * @param id the id of the vehicleTypeDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicleType(@PathVariable("id") Long id) {
        log.debug("REST request to delete VehicleType : {}", id);
        vehicleTypeService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}