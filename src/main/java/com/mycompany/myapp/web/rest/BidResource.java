package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.repository.BidRepository;
import com.mycompany.myapp.service.BidService;
import com.mycompany.myapp.service.dto.BidDTO;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Bid}.
 */
@RestController
@RequestMapping("/api/bids")
public class BidResource {

    private final Logger log = LoggerFactory.getLogger(BidResource.class);

    private static final String ENTITY_NAME = "bid";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BidService bidService;

    private final BidRepository bidRepository;

    public BidResource(BidService bidService, BidRepository bidRepository) {
        this.bidService = bidService;
        this.bidRepository = bidRepository;
    }

    /**
     * {@code POST  /bids} : Create a new bid.
     *
     * @param bidDTO the bidDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new bidDTO, or with status {@code 400 (Bad Request)} if the bid has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<BidDTO> createBid(@RequestBody BidDTO bidDTO) throws URISyntaxException {
        log.debug("REST request to save Bid : {}", bidDTO);
        if (bidDTO.getId() != null) {
            throw new BadRequestAlertException("A new bid cannot already have an ID", ENTITY_NAME, "idexists");
        }
        bidDTO = bidService.save(bidDTO);
        return ResponseEntity.created(new URI("/api/bids/" + bidDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, bidDTO.getId().toString()))
            .body(bidDTO);
    }

    /**
     * {@code PUT  /bids/:id} : Updates an existing bid.
     *
     * @param id the id of the bidDTO to save.
     * @param bidDTO the bidDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bidDTO,
     * or with status {@code 400 (Bad Request)} if the bidDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the bidDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<BidDTO> updateBid(@PathVariable(value = "id", required = false) final Long id, @RequestBody BidDTO bidDTO)
        throws URISyntaxException {
        log.debug("REST request to update Bid : {}, {}", id, bidDTO);
        if (bidDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bidDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bidRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        bidDTO = bidService.update(bidDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bidDTO.getId().toString()))
            .body(bidDTO);
    }

    /**
     * {@code PATCH  /bids/:id} : Partial updates given fields of an existing bid, field will ignore if it is null
     *
     * @param id the id of the bidDTO to save.
     * @param bidDTO the bidDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated bidDTO,
     * or with status {@code 400 (Bad Request)} if the bidDTO is not valid,
     * or with status {@code 404 (Not Found)} if the bidDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the bidDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<BidDTO> partialUpdateBid(@PathVariable(value = "id", required = false) final Long id, @RequestBody BidDTO bidDTO)
        throws URISyntaxException {
        log.debug("REST request to partial update Bid partially : {}, {}", id, bidDTO);
        if (bidDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, bidDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!bidRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<BidDTO> result = bidService.partialUpdate(bidDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, bidDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /bids} : get all the bids.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of bids in body.
     */
    @GetMapping("")
    public ResponseEntity<List<BidDTO>> getAllBids(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        if ("winningbid-is-null".equals(filter)) {
            log.debug("REST request to get all Bids where winningBid is null");
            return new ResponseEntity<>(bidService.findAllWhereWinningBidIsNull(), HttpStatus.OK);
        }
        log.debug("REST request to get a page of Bids");
        Page<BidDTO> page;
        if (eagerload) {
            page = bidService.findAllWithEagerRelationships(pageable);
        } else {
            page = bidService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /bids/:id} : get the "id" bid.
     *
     * @param id the id of the bidDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the bidDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<BidDTO> getBid(@PathVariable("id") Long id) {
        log.debug("REST request to get Bid : {}", id);
        Optional<BidDTO> bidDTO = bidService.findOne(id);
        return ResponseUtil.wrapOrNotFound(bidDTO);
    }

    /**
     * {@code DELETE  /bids/:id} : delete the "id" bid.
     *
     * @param id the id of the bidDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBid(@PathVariable("id") Long id) {
        log.debug("REST request to delete Bid : {}", id);
        bidService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
