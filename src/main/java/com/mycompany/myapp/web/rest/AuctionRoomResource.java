package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.AuctionRoomRepository;
import com.mycompany.myapp.service.AuctionRoomService;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.AuctionRoom}.
 */
@RestController
@RequestMapping("/api/auction-rooms")
public class AuctionRoomResource {

    private final Logger log = LoggerFactory.getLogger(AuctionRoomResource.class);

    private static final String ENTITY_NAME = "auctionRoom";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AuctionRoomService auctionRoomService;

    private final AuctionRoomRepository auctionRoomRepository;

    public AuctionRoomResource(AuctionRoomService auctionRoomService, AuctionRoomRepository auctionRoomRepository) {
        this.auctionRoomService = auctionRoomService;
        this.auctionRoomRepository = auctionRoomRepository;
    }

    /**
     * {@code POST  /auction-rooms} : Create a new auctionRoom.
     *
     * @param auctionRoomDTO the auctionRoomDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new auctionRoomDTO, or with status {@code 400 (Bad Request)} if the auctionRoom has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AuctionRoomDTO> createAuctionRoom(@RequestBody AuctionRoomDTO auctionRoomDTO) throws URISyntaxException {
        log.debug("REST request to save AuctionRoom : {}", auctionRoomDTO);
        if (auctionRoomDTO.getId() != null) {
            throw new BadRequestAlertException("A new auctionRoom cannot already have an ID", ENTITY_NAME, "idexists");
        }
        auctionRoomDTO = auctionRoomService.save(auctionRoomDTO);
        return ResponseEntity.created(new URI("/api/auction-rooms/" + auctionRoomDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, auctionRoomDTO.getId().toString()))
            .body(auctionRoomDTO);
    }

    /**
     * {@code PUT  /auction-rooms/:id} : Updates an existing auctionRoom.
     *
     * @param id the id of the auctionRoomDTO to save.
     * @param auctionRoomDTO the auctionRoomDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated auctionRoomDTO,
     * or with status {@code 400 (Bad Request)} if the auctionRoomDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the auctionRoomDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AuctionRoomDTO> updateAuctionRoom(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AuctionRoomDTO auctionRoomDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AuctionRoom : {}, {}", id, auctionRoomDTO);
        if (auctionRoomDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, auctionRoomDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!auctionRoomRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        auctionRoomDTO = auctionRoomService.update(auctionRoomDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, auctionRoomDTO.getId().toString()))
            .body(auctionRoomDTO);
    }

    /**
     * {@code PATCH  /auction-rooms/:id} : Partial updates given fields of an existing auctionRoom, field will ignore if it is null
     *
     * @param id the id of the auctionRoomDTO to save.
     * @param auctionRoomDTO the auctionRoomDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated auctionRoomDTO,
     * or with status {@code 400 (Bad Request)} if the auctionRoomDTO is not valid,
     * or with status {@code 404 (Not Found)} if the auctionRoomDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the auctionRoomDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AuctionRoomDTO> partialUpdateAuctionRoom(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AuctionRoomDTO auctionRoomDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AuctionRoom partially : {}, {}", id, auctionRoomDTO);
        if (auctionRoomDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, auctionRoomDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!auctionRoomRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AuctionRoomDTO> result = auctionRoomService.partialUpdate(auctionRoomDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, auctionRoomDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /auction-rooms} : get all the auctionRooms.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of auctionRooms in body.
     */
    @GetMapping("")
    public ResponseEntity<List<AuctionRoomDTO>> getAllAuctionRooms(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        if ("winningbid-is-null".equals(filter)) {
            log.debug("REST request to get all AuctionRooms where winningBid is null");
            return new ResponseEntity<>(auctionRoomService.findAllWhereWinningBidIsNull(), HttpStatus.OK);
        }

        if ("licenseplate-is-null".equals(filter)) {
            log.debug("REST request to get all AuctionRooms where licensePlate is null");
            return new ResponseEntity<>(auctionRoomService.findAllWhereLicensePlateIsNull(), HttpStatus.OK);
        }
        log.debug("REST request to get a page of AuctionRooms");
        Page<AuctionRoomDTO> page;
        if (eagerload) {
            page = auctionRoomService.findAllWithEagerRelationships(pageable);
        } else {
            page = auctionRoomService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /auction-rooms/:id} : get the "id" auctionRoom.
     *
     * @param id the id of the auctionRoomDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the auctionRoomDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AuctionRoomDTO> getAuctionRoom(@PathVariable("id") Long id) {
        log.debug("REST request to get AuctionRoom : {}", id);
        Optional<AuctionRoomDTO> auctionRoomDTO = auctionRoomService.findOne(id);
        return ResponseUtil.wrapOrNotFound(auctionRoomDTO);
    }

    /**
     * {@code DELETE  /auction-rooms/:id} : delete the "id" auctionRoom.
     *
     * @param id the id of the auctionRoomDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuctionRoom(@PathVariable("id") Long id) {
        log.debug("REST request to delete AuctionRoom : {}", id);
        auctionRoomService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
