package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.LicensePlateRepository;
import com.mycompany.myapp.service.LicensePlateService;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
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
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.LicensePlate}.
 */
@RestController
@RequestMapping("/api/license-plates")
public class LicensePlateResource {

    private final Logger log = LoggerFactory.getLogger(LicensePlateResource.class);

    private static final String ENTITY_NAME = "licensePlate";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LicensePlateService licensePlateService;

    private final LicensePlateRepository licensePlateRepository;

    public LicensePlateResource(LicensePlateService licensePlateService, LicensePlateRepository licensePlateRepository) {
        this.licensePlateService = licensePlateService;
        this.licensePlateRepository = licensePlateRepository;
    }

    /**
     * {@code POST  /license-plates} : Create a new licensePlate.
     *
     * @param licensePlateDTO the licensePlateDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new licensePlateDTO, or with status {@code 400 (Bad Request)} if the licensePlate has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LicensePlateDTO> createLicensePlate(@RequestBody LicensePlateDTO licensePlateDTO) throws URISyntaxException {
        log.debug("REST request to save LicensePlate : {}", licensePlateDTO);
        if (licensePlateDTO.getId() != null) {
            throw new BadRequestAlertException("A new licensePlate cannot already have an ID", ENTITY_NAME, "idexists");
        }
        licensePlateDTO = licensePlateService.save(licensePlateDTO);
        return ResponseEntity.created(new URI("/api/license-plates/" + licensePlateDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, licensePlateDTO.getId().toString()))
            .body(licensePlateDTO);
    }

    /**
     * {@code PUT  /license-plates/:id} : Updates an existing licensePlate.
     *
     * @param id the id of the licensePlateDTO to save.
     * @param licensePlateDTO the licensePlateDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated licensePlateDTO,
     * or with status {@code 400 (Bad Request)} if the licensePlateDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the licensePlateDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LicensePlateDTO> updateLicensePlate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LicensePlateDTO licensePlateDTO
    ) throws URISyntaxException {
        log.debug("REST request to update LicensePlate : {}, {}", id, licensePlateDTO);
        if (licensePlateDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, licensePlateDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!licensePlateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        licensePlateDTO = licensePlateService.update(licensePlateDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, licensePlateDTO.getId().toString()))
            .body(licensePlateDTO);
    }

    /**
     * {@code PATCH  /license-plates/:id} : Partial updates given fields of an existing licensePlate, field will ignore if it is null
     *
     * @param id the id of the licensePlateDTO to save.
     * @param licensePlateDTO the licensePlateDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated licensePlateDTO,
     * or with status {@code 400 (Bad Request)} if the licensePlateDTO is not valid,
     * or with status {@code 404 (Not Found)} if the licensePlateDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the licensePlateDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LicensePlateDTO> partialUpdateLicensePlate(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LicensePlateDTO licensePlateDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update LicensePlate partially : {}, {}", id, licensePlateDTO);
        if (licensePlateDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, licensePlateDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!licensePlateRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LicensePlateDTO> result = licensePlateService.partialUpdate(licensePlateDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, licensePlateDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /license-plates} : get all the licensePlates.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of licensePlates in body.
     */
    @GetMapping("")
    public List<LicensePlateDTO> getAllLicensePlates(@RequestParam(name = "filter", required = false) String filter) {
        if ("desc".equals(filter)) {
            return licensePlateService.getAllOrderByCreatedDateDESC();
        } else if ("asc".equals(filter)) {
            return licensePlateService.getAllOrderByCreatedDateASC();
        }
        return licensePlateService.findAll();
    }

    /**
     * {@code GET  /license-plates/:id} : get the "id" licensePlate.
     *
     * @param id the id of the licensePlateDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the licensePlateDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LicensePlateDTO> getLicensePlate(@PathVariable("id") Long id) {
        log.debug("REST request to get LicensePlate : {}", id);
        Optional<LicensePlateDTO> licensePlateDTO = licensePlateService.findOne(id);
        return ResponseUtil.wrapOrNotFound(licensePlateDTO);
    }

    /**
     * {@code DELETE  /license-plates/:id} : delete the "id" licensePlate.
     *
     * @param id the id of the licensePlateDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicensePlate(@PathVariable("id") Long id) {
        log.debug("REST request to delete LicensePlate : {}", id);
        licensePlateService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
