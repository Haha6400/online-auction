package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.WinningBidAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.WinningBid;
import com.mycompany.myapp.repository.WinningBidRepository;
import com.mycompany.myapp.service.dto.WinningBidDTO;
import com.mycompany.myapp.service.mapper.WinningBidMapper;
import jakarta.persistence.EntityManager;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link WinningBidResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class WinningBidResourceIT {

    private static final Boolean DEFAULT_PAYMENT_STATUS = false;
    private static final Boolean UPDATED_PAYMENT_STATUS = true;

    private static final String ENTITY_API_URL = "/api/winning-bids";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private WinningBidRepository winningBidRepository;

    @Autowired
    private WinningBidMapper winningBidMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restWinningBidMockMvc;

    private WinningBid winningBid;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WinningBid createEntity(EntityManager em) {
        WinningBid winningBid = new WinningBid().paymentStatus(DEFAULT_PAYMENT_STATUS);
        return winningBid;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static WinningBid createUpdatedEntity(EntityManager em) {
        WinningBid winningBid = new WinningBid().paymentStatus(UPDATED_PAYMENT_STATUS);
        return winningBid;
    }

    @BeforeEach
    public void initTest() {
        winningBid = createEntity(em);
    }

    @Test
    @Transactional
    void createWinningBid() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);
        var returnedWinningBidDTO = om.readValue(
            restWinningBidMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(winningBidDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            WinningBidDTO.class
        );

        // Validate the WinningBid in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedWinningBid = winningBidMapper.toEntity(returnedWinningBidDTO);
        assertWinningBidUpdatableFieldsEquals(returnedWinningBid, getPersistedWinningBid(returnedWinningBid));
    }

    @Test
    @Transactional
    void createWinningBidWithExistingId() throws Exception {
        // Create the WinningBid with an existing ID
        winningBid.setId(1L);
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restWinningBidMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(winningBidDTO)))
            .andExpect(status().isBadRequest());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllWinningBids() throws Exception {
        // Initialize the database
        winningBidRepository.saveAndFlush(winningBid);

        // Get all the winningBidList
        restWinningBidMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(winningBid.getId().intValue())))
            .andExpect(jsonPath("$.[*].paymentStatus").value(hasItem(DEFAULT_PAYMENT_STATUS.booleanValue())));
    }

    @Test
    @Transactional
    void getWinningBid() throws Exception {
        // Initialize the database
        winningBidRepository.saveAndFlush(winningBid);

        // Get the winningBid
        restWinningBidMockMvc
            .perform(get(ENTITY_API_URL_ID, winningBid.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(winningBid.getId().intValue()))
            .andExpect(jsonPath("$.paymentStatus").value(DEFAULT_PAYMENT_STATUS.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingWinningBid() throws Exception {
        // Get the winningBid
        restWinningBidMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingWinningBid() throws Exception {
        // Initialize the database
        winningBidRepository.saveAndFlush(winningBid);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the winningBid
        WinningBid updatedWinningBid = winningBidRepository.findById(winningBid.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedWinningBid are not directly saved in db
        em.detach(updatedWinningBid);
        updatedWinningBid.paymentStatus(UPDATED_PAYMENT_STATUS);
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(updatedWinningBid);

        restWinningBidMockMvc
            .perform(
                put(ENTITY_API_URL_ID, winningBidDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(winningBidDTO))
            )
            .andExpect(status().isOk());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedWinningBidToMatchAllProperties(updatedWinningBid);
    }

    @Test
    @Transactional
    void putNonExistingWinningBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        winningBid.setId(longCount.incrementAndGet());

        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWinningBidMockMvc
            .perform(
                put(ENTITY_API_URL_ID, winningBidDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(winningBidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchWinningBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        winningBid.setId(longCount.incrementAndGet());

        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWinningBidMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(winningBidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamWinningBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        winningBid.setId(longCount.incrementAndGet());

        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWinningBidMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(winningBidDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateWinningBidWithPatch() throws Exception {
        // Initialize the database
        winningBidRepository.saveAndFlush(winningBid);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the winningBid using partial update
        WinningBid partialUpdatedWinningBid = new WinningBid();
        partialUpdatedWinningBid.setId(winningBid.getId());

        partialUpdatedWinningBid.paymentStatus(UPDATED_PAYMENT_STATUS);

        restWinningBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWinningBid.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWinningBid))
            )
            .andExpect(status().isOk());

        // Validate the WinningBid in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWinningBidUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedWinningBid, winningBid),
            getPersistedWinningBid(winningBid)
        );
    }

    @Test
    @Transactional
    void fullUpdateWinningBidWithPatch() throws Exception {
        // Initialize the database
        winningBidRepository.saveAndFlush(winningBid);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the winningBid using partial update
        WinningBid partialUpdatedWinningBid = new WinningBid();
        partialUpdatedWinningBid.setId(winningBid.getId());

        partialUpdatedWinningBid.paymentStatus(UPDATED_PAYMENT_STATUS);

        restWinningBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedWinningBid.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedWinningBid))
            )
            .andExpect(status().isOk());

        // Validate the WinningBid in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertWinningBidUpdatableFieldsEquals(partialUpdatedWinningBid, getPersistedWinningBid(partialUpdatedWinningBid));
    }

    @Test
    @Transactional
    void patchNonExistingWinningBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        winningBid.setId(longCount.incrementAndGet());

        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restWinningBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, winningBidDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(winningBidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchWinningBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        winningBid.setId(longCount.incrementAndGet());

        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWinningBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(winningBidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamWinningBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        winningBid.setId(longCount.incrementAndGet());

        // Create the WinningBid
        WinningBidDTO winningBidDTO = winningBidMapper.toDto(winningBid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restWinningBidMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(winningBidDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the WinningBid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteWinningBid() throws Exception {
        // Initialize the database
        winningBidRepository.saveAndFlush(winningBid);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the winningBid
        restWinningBidMockMvc
            .perform(delete(ENTITY_API_URL_ID, winningBid.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return winningBidRepository.count();
    }

    protected void assertIncrementedRepositoryCount(long countBefore) {
        assertThat(countBefore + 1).isEqualTo(getRepositoryCount());
    }

    protected void assertDecrementedRepositoryCount(long countBefore) {
        assertThat(countBefore - 1).isEqualTo(getRepositoryCount());
    }

    protected void assertSameRepositoryCount(long countBefore) {
        assertThat(countBefore).isEqualTo(getRepositoryCount());
    }

    protected WinningBid getPersistedWinningBid(WinningBid winningBid) {
        return winningBidRepository.findById(winningBid.getId()).orElseThrow();
    }

    protected void assertPersistedWinningBidToMatchAllProperties(WinningBid expectedWinningBid) {
        assertWinningBidAllPropertiesEquals(expectedWinningBid, getPersistedWinningBid(expectedWinningBid));
    }

    protected void assertPersistedWinningBidToMatchUpdatableProperties(WinningBid expectedWinningBid) {
        assertWinningBidAllUpdatablePropertiesEquals(expectedWinningBid, getPersistedWinningBid(expectedWinningBid));
    }
}
