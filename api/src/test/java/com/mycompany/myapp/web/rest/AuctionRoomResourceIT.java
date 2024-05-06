package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.AuctionRoomAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.repository.AuctionRoomRepository;
import com.mycompany.myapp.service.AuctionRoomService;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.mapper.AuctionRoomMapper;
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
 * Integration tests for the {@link AuctionRoomResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class AuctionRoomResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_START_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_START_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_END_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_END_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Long DEFAULT_INIT_PRICE = 1L;
    private static final Long UPDATED_INIT_PRICE = 2L;

    private static final String ENTITY_API_URL = "/api/auction-rooms";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private AuctionRoomRepository auctionRoomRepository;

    @Mock
    private AuctionRoomRepository auctionRoomRepositoryMock;

    @Autowired
    private AuctionRoomMapper auctionRoomMapper;

    @Mock
    private AuctionRoomService auctionRoomServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAuctionRoomMockMvc;

    private AuctionRoom auctionRoom;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuctionRoom createEntity(EntityManager em) {
        AuctionRoom auctionRoom = new AuctionRoom()
            .description(DEFAULT_DESCRIPTION)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME)
            .initPrice(DEFAULT_INIT_PRICE);
        return auctionRoom;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AuctionRoom createUpdatedEntity(EntityManager em) {
        AuctionRoom auctionRoom = new AuctionRoom()
            .description(UPDATED_DESCRIPTION)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .initPrice(UPDATED_INIT_PRICE);
        return auctionRoom;
    }

    @BeforeEach
    public void initTest() {
        auctionRoom = createEntity(em);
    }

    @Test
    @Transactional
    void createAuctionRoom() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);
        var returnedAuctionRoomDTO = om.readValue(
            restAuctionRoomMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auctionRoomDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            AuctionRoomDTO.class
        );

        // Validate the AuctionRoom in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedAuctionRoom = auctionRoomMapper.toEntity(returnedAuctionRoomDTO);
        assertAuctionRoomUpdatableFieldsEquals(returnedAuctionRoom, getPersistedAuctionRoom(returnedAuctionRoom));
    }

    @Test
    @Transactional
    void createAuctionRoomWithExistingId() throws Exception {
        // Create the AuctionRoom with an existing ID
        auctionRoom.setId(1L);
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restAuctionRoomMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auctionRoomDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllAuctionRooms() throws Exception {
        // Initialize the database
        auctionRoomRepository.saveAndFlush(auctionRoom);

        // Get all the auctionRoomList
        restAuctionRoomMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(auctionRoom.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(DEFAULT_START_TIME.toString())))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(DEFAULT_END_TIME.toString())))
            .andExpect(jsonPath("$.[*].initPrice").value(hasItem(DEFAULT_INIT_PRICE.intValue())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAuctionRoomsWithEagerRelationshipsIsEnabled() throws Exception {
        when(auctionRoomServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAuctionRoomMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(auctionRoomServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllAuctionRoomsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(auctionRoomServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restAuctionRoomMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(auctionRoomRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getAuctionRoom() throws Exception {
        // Initialize the database
        auctionRoomRepository.saveAndFlush(auctionRoom);

        // Get the auctionRoom
        restAuctionRoomMockMvc
            .perform(get(ENTITY_API_URL_ID, auctionRoom.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(auctionRoom.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.startTime").value(DEFAULT_START_TIME.toString()))
            .andExpect(jsonPath("$.endTime").value(DEFAULT_END_TIME.toString()))
            .andExpect(jsonPath("$.initPrice").value(DEFAULT_INIT_PRICE.intValue()));
    }

    @Test
    @Transactional
    void getNonExistingAuctionRoom() throws Exception {
        // Get the auctionRoom
        restAuctionRoomMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingAuctionRoom() throws Exception {
        // Initialize the database
        auctionRoomRepository.saveAndFlush(auctionRoom);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the auctionRoom
        AuctionRoom updatedAuctionRoom = auctionRoomRepository.findById(auctionRoom.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedAuctionRoom are not directly saved in db
        em.detach(updatedAuctionRoom);
        updatedAuctionRoom
            .description(UPDATED_DESCRIPTION)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .initPrice(UPDATED_INIT_PRICE);
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(updatedAuctionRoom);

        restAuctionRoomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, auctionRoomDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(auctionRoomDTO))
            )
            .andExpect(status().isOk());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedAuctionRoomToMatchAllProperties(updatedAuctionRoom);
    }

    @Test
    @Transactional
    void putNonExistingAuctionRoom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auctionRoom.setId(longCount.incrementAndGet());

        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuctionRoomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, auctionRoomDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(auctionRoomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchAuctionRoom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auctionRoom.setId(longCount.incrementAndGet());

        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAuctionRoomMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(auctionRoomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamAuctionRoom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auctionRoom.setId(longCount.incrementAndGet());

        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAuctionRoomMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(auctionRoomDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateAuctionRoomWithPatch() throws Exception {
        // Initialize the database
        auctionRoomRepository.saveAndFlush(auctionRoom);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the auctionRoom using partial update
        AuctionRoom partialUpdatedAuctionRoom = new AuctionRoom();
        partialUpdatedAuctionRoom.setId(auctionRoom.getId());

        partialUpdatedAuctionRoom.startTime(UPDATED_START_TIME).initPrice(UPDATED_INIT_PRICE);

        restAuctionRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAuctionRoom.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAuctionRoom))
            )
            .andExpect(status().isOk());

        // Validate the AuctionRoom in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAuctionRoomUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedAuctionRoom, auctionRoom),
            getPersistedAuctionRoom(auctionRoom)
        );
    }

    @Test
    @Transactional
    void fullUpdateAuctionRoomWithPatch() throws Exception {
        // Initialize the database
        auctionRoomRepository.saveAndFlush(auctionRoom);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the auctionRoom using partial update
        AuctionRoom partialUpdatedAuctionRoom = new AuctionRoom();
        partialUpdatedAuctionRoom.setId(auctionRoom.getId());

        partialUpdatedAuctionRoom
            .description(UPDATED_DESCRIPTION)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME)
            .initPrice(UPDATED_INIT_PRICE);

        restAuctionRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedAuctionRoom.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedAuctionRoom))
            )
            .andExpect(status().isOk());

        // Validate the AuctionRoom in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertAuctionRoomUpdatableFieldsEquals(partialUpdatedAuctionRoom, getPersistedAuctionRoom(partialUpdatedAuctionRoom));
    }

    @Test
    @Transactional
    void patchNonExistingAuctionRoom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auctionRoom.setId(longCount.incrementAndGet());

        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAuctionRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, auctionRoomDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(auctionRoomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchAuctionRoom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auctionRoom.setId(longCount.incrementAndGet());

        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAuctionRoomMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(auctionRoomDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamAuctionRoom() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        auctionRoom.setId(longCount.incrementAndGet());

        // Create the AuctionRoom
        AuctionRoomDTO auctionRoomDTO = auctionRoomMapper.toDto(auctionRoom);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restAuctionRoomMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(auctionRoomDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the AuctionRoom in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteAuctionRoom() throws Exception {
        // Initialize the database
        auctionRoomRepository.saveAndFlush(auctionRoom);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the auctionRoom
        restAuctionRoomMockMvc
            .perform(delete(ENTITY_API_URL_ID, auctionRoom.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return auctionRoomRepository.count();
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

    protected AuctionRoom getPersistedAuctionRoom(AuctionRoom auctionRoom) {
        return auctionRoomRepository.findById(auctionRoom.getId()).orElseThrow();
    }

    protected void assertPersistedAuctionRoomToMatchAllProperties(AuctionRoom expectedAuctionRoom) {
        assertAuctionRoomAllPropertiesEquals(expectedAuctionRoom, getPersistedAuctionRoom(expectedAuctionRoom));
    }

    protected void assertPersistedAuctionRoomToMatchUpdatableProperties(AuctionRoom expectedAuctionRoom) {
        assertAuctionRoomAllUpdatablePropertiesEquals(expectedAuctionRoom, getPersistedAuctionRoom(expectedAuctionRoom));
    }
}
