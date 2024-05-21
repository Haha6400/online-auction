package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.enumeration.PaymentStatus;
import com.mycompany.myapp.repository.WinningBidRepository;
import com.mycompany.myapp.service.UserService;
import com.mycompany.myapp.service.WinningBidService;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.WinningBidDTO;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.WinningBid}.
 */
@RestController
@RequestMapping("/api/winning-bids")
public class WinningBidResource {

    private final Logger log = LoggerFactory.getLogger(WinningBidResource.class);

    private static final String ENTITY_NAME = "winningBid";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WinningBidService winningBidService;

    private final WinningBidRepository winningBidRepository;
    private final UserService userService;

    public WinningBidResource(WinningBidService winningBidService, WinningBidRepository winningBidRepository,
            UserService userService) {
        this.winningBidService = winningBidService;
        this.winningBidRepository = winningBidRepository;
        this.userService = userService;
    }

    /**
     * {@code POST  /winning-bids} : Create a new winningBid.
     *
     * @param winningBidDTO the winningBidDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new winningBidDTO, or with status {@code 400 (Bad Request)}
     *         if the winningBid has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<WinningBidDTO> createWinningBid(@RequestBody WinningBidDTO winningBidDTO)
            throws URISyntaxException {
        log.debug("REST request to save WinningBid : {}", winningBidDTO);
        if (winningBidDTO.getId() != null) {
            throw new BadRequestAlertException("A new winningBid cannot already have an ID", ENTITY_NAME, "idexists");
        }
        winningBidDTO = winningBidService.save(winningBidDTO);
        return ResponseEntity.created(new URI("/api/winning-bids/" + winningBidDTO.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME,
                        winningBidDTO.getId().toString()))
                .body(winningBidDTO);
    }

    /**
     * {@code PUT  /winning-bids/:id} : Updates an existing winningBid.
     *
     * @param id            the id of the winningBidDTO to save.
     * @param winningBidDTO the winningBidDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated winningBidDTO,
     *         or with status {@code 400 (Bad Request)} if the winningBidDTO is not
     *         valid,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         winningBidDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<WinningBidDTO> updateWinningBid(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody WinningBidDTO winningBidDTO) throws URISyntaxException {
        log.debug("REST request to update WinningBid : {}, {}", id, winningBidDTO);
        if (winningBidDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, winningBidDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!winningBidRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        winningBidDTO = winningBidService.update(winningBidDTO);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME,
                        winningBidDTO.getId().toString()))
                .body(winningBidDTO);
    }

    /**
     * {@code PATCH  /winning-bids/:id} : Partial updates given fields of an
     * existing winningBid, field will ignore if it is null
     *
     * @param id            the id of the winningBidDTO to save.
     * @param winningBidDTO the winningBidDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the updated winningBidDTO,
     *         or with status {@code 400 (Bad Request)} if the winningBidDTO is not
     *         valid,
     *         or with status {@code 404 (Not Found)} if the winningBidDTO is not
     *         found,
     *         or with status {@code 500 (Internal Server Error)} if the
     *         winningBidDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WinningBidDTO> partialUpdateWinningBid(
            @PathVariable(value = "id", required = false) final Long id,
            @RequestBody WinningBidDTO winningBidDTO) throws URISyntaxException {
        log.debug("REST request to partial update WinningBid partially : {}, {}", id, winningBidDTO);

        if (!winningBidRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WinningBidDTO> result = winningBidService.partialUpdate(winningBidDTO, id);

        return ResponseUtil.wrapOrNotFound(result,
                HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, id.toString()));
    }

    /**
     * {@code GET  /winning-bids} : get all the winningBids.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list
     *         of winningBids in body.
     */
    @GetMapping("")
    public List<WinningBidDTO> getAllWinningBids() {
        log.debug("REST request to get all WinningBids");
        return winningBidService.findAll();
    }

    /**
     * {@code GET  /winning-bids/:id} : get the "id" winningBid.
     *
     * @param id the id of the winningBidDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body
     *         the winningBidDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<WinningBidDTO> getWinningBid(@PathVariable("id") Long id) {
        log.debug("REST request to get WinningBid : {}", id);
        Optional<WinningBidDTO> winningBidDTO = winningBidService.findOne(id);
        return ResponseUtil.wrapOrNotFound(winningBidDTO);
    }

    /**
     * {@code DELETE  /winning-bids/:id} : delete the "id" winningBid.
     *
     * @param id the id of the winningBidDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWinningBid(@PathVariable("id") Long id) {
        log.debug("REST request to delete WinningBid : {}", id);
        winningBidService.delete(id);
        return ResponseEntity.noContent()
                .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
                .build();
    }

    @GetMapping("/self/all")
    public List<?> getAllByCurrentUser(@RequestParam(name = "filter", required = false) String filter) {
        log.debug("REST request to get all WinningBids");
        if ("paid".equals(filter)) {
            return winningBidService.findAllWinningLicenseByStatus(userService.getCurrentUserDTO().get(),
                    PaymentStatus.PAID);
        } else if ("unpaid".equals(filter)) {
            return winningBidService.findAllWinningLicenseByStatus(userService.getCurrentUserDTO().get(),
                    PaymentStatus.UNPAID);
        } else if ("waiting_confirm".equals(filter)) {
            return winningBidService.findAllWinningLicenseByStatus(userService.getCurrentUserDTO().get(),
                    PaymentStatus.WAITING_CONFIRM);
        } else if ("past_due".equals(filter)) {
            return winningBidService.findAllWinningLicenseByStatus(userService.getCurrentUserDTO().get(),
                    PaymentStatus.PAST_DUE);
        }
        return winningBidService.findAllWinningLicenseByUsers(userService.getCurrentUserDTO().get());
    }
}
