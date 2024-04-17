package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.BidAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.repository.BidRepository;
import com.mycompany.myapp.service.BidService;
import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.service.mapper.BidMapper;
import jakarta.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link BidResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class BidResourceIT {

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final Instant DEFAULT_TIMESTAMP = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_TIMESTAMP = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/bids";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private BidRepository bidRepository;

    @Mock
    private BidRepository bidRepositoryMock;

    @Autowired
    private BidMapper bidMapper;

    @Mock
    private BidService bidServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restBidMockMvc;

    private Bid bid;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bid createEntity(EntityManager em) {
        Bid bid = new Bid().amount(DEFAULT_AMOUNT).timestamp(DEFAULT_TIMESTAMP);
        return bid;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Bid createUpdatedEntity(EntityManager em) {
        Bid bid = new Bid().amount(UPDATED_AMOUNT).timestamp(UPDATED_TIMESTAMP);
        return bid;
    }

    @BeforeEach
    public void initTest() {
        bid = createEntity(em);
    }

    @Test
    @Transactional
    void createBid() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);
        var returnedBidDTO = om.readValue(
            restBidMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bidDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            BidDTO.class
        );

        // Validate the Bid in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedBid = bidMapper.toEntity(returnedBidDTO);
        assertBidUpdatableFieldsEquals(returnedBid, getPersistedBid(returnedBid));
    }

    @Test
    @Transactional
    void createBidWithExistingId() throws Exception {
        // Create the Bid with an existing ID
        bid.setId(1L);
        BidDTO bidDTO = bidMapper.toDto(bid);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restBidMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bidDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllBids() throws Exception {
        // Initialize the database
        bidRepository.saveAndFlush(bid);

        // Get all the bidList
        restBidMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bid.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].timestamp").value(hasItem(DEFAULT_TIMESTAMP.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBidsWithEagerRelationshipsIsEnabled() throws Exception {
        when(bidServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBidMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(bidServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllBidsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(bidServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restBidMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(bidRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getBid() throws Exception {
        // Initialize the database
        bidRepository.saveAndFlush(bid);

        // Get the bid
        restBidMockMvc
            .perform(get(ENTITY_API_URL_ID, bid.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(bid.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.timestamp").value(DEFAULT_TIMESTAMP.toString()));
    }

    @Test
    @Transactional
    void getNonExistingBid() throws Exception {
        // Get the bid
        restBidMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingBid() throws Exception {
        // Initialize the database
        bidRepository.saveAndFlush(bid);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bid
        Bid updatedBid = bidRepository.findById(bid.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedBid are not directly saved in db
        em.detach(updatedBid);
        updatedBid.amount(UPDATED_AMOUNT).timestamp(UPDATED_TIMESTAMP);
        BidDTO bidDTO = bidMapper.toDto(updatedBid);

        restBidMockMvc
            .perform(put(ENTITY_API_URL_ID, bidDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bidDTO)))
            .andExpect(status().isOk());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedBidToMatchAllProperties(updatedBid);
    }

    @Test
    @Transactional
    void putNonExistingBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bid.setId(longCount.incrementAndGet());

        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBidMockMvc
            .perform(put(ENTITY_API_URL_ID, bidDTO.getId()).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bidDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bid.setId(longCount.incrementAndGet());

        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBidMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(bidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bid.setId(longCount.incrementAndGet());

        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBidMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(bidDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateBidWithPatch() throws Exception {
        // Initialize the database
        bidRepository.saveAndFlush(bid);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bid using partial update
        Bid partialUpdatedBid = new Bid();
        partialUpdatedBid.setId(bid.getId());

        restBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBid.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBid))
            )
            .andExpect(status().isOk());

        // Validate the Bid in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBidUpdatableFieldsEquals(createUpdateProxyForBean(partialUpdatedBid, bid), getPersistedBid(bid));
    }

    @Test
    @Transactional
    void fullUpdateBidWithPatch() throws Exception {
        // Initialize the database
        bidRepository.saveAndFlush(bid);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the bid using partial update
        Bid partialUpdatedBid = new Bid();
        partialUpdatedBid.setId(bid.getId());

        partialUpdatedBid.amount(UPDATED_AMOUNT).timestamp(UPDATED_TIMESTAMP);

        restBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedBid.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedBid))
            )
            .andExpect(status().isOk());

        // Validate the Bid in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertBidUpdatableFieldsEquals(partialUpdatedBid, getPersistedBid(partialUpdatedBid));
    }

    @Test
    @Transactional
    void patchNonExistingBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bid.setId(longCount.incrementAndGet());

        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, bidDTO.getId()).contentType("application/merge-patch+json").content(om.writeValueAsBytes(bidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bid.setId(longCount.incrementAndGet());

        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBidMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(bidDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamBid() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        bid.setId(longCount.incrementAndGet());

        // Create the Bid
        BidDTO bidDTO = bidMapper.toDto(bid);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restBidMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(bidDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Bid in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteBid() throws Exception {
        // Initialize the database
        bidRepository.saveAndFlush(bid);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the bid
        restBidMockMvc.perform(delete(ENTITY_API_URL_ID, bid.getId()).accept(MediaType.APPLICATION_JSON)).andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return bidRepository.count();
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

    protected Bid getPersistedBid(Bid bid) {
        return bidRepository.findById(bid.getId()).orElseThrow();
    }

    protected void assertPersistedBidToMatchAllProperties(Bid expectedBid) {
        assertBidAllPropertiesEquals(expectedBid, getPersistedBid(expectedBid));
    }

    protected void assertPersistedBidToMatchUpdatableProperties(Bid expectedBid) {
        assertBidAllUpdatablePropertiesEquals(expectedBid, getPersistedBid(expectedBid));
    }
}
