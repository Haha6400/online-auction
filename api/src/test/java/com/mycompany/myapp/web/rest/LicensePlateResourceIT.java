package com.mycompany.myapp.web.rest;

import static com.mycompany.myapp.domain.LicensePlateAsserts.*;
import static com.mycompany.myapp.web.rest.TestUtil.createUpdateProxyForBean;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.repository.LicensePlateRepository;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.mapper.LicensePlateMapper;
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
 * Integration tests for the {@link LicensePlateResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LicensePlateResourceIT {

    private static final String DEFAULT_PLATE_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_PLATE_NUMBER = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/license-plates";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ObjectMapper om;

    @Autowired
    private LicensePlateRepository licensePlateRepository;

    @Autowired
    private LicensePlateMapper licensePlateMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLicensePlateMockMvc;

    private LicensePlate licensePlate;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LicensePlate createEntity(EntityManager em) {
        LicensePlate licensePlate = new LicensePlate().plateNumber(DEFAULT_PLATE_NUMBER);
        return licensePlate;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static LicensePlate createUpdatedEntity(EntityManager em) {
        LicensePlate licensePlate = new LicensePlate().plateNumber(UPDATED_PLATE_NUMBER);
        return licensePlate;
    }

    @BeforeEach
    public void initTest() {
        licensePlate = createEntity(em);
    }

    @Test
    @Transactional
    void createLicensePlate() throws Exception {
        long databaseSizeBeforeCreate = getRepositoryCount();
        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);
        var returnedLicensePlateDTO = om.readValue(
            restLicensePlateMockMvc
                .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(licensePlateDTO)))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString(),
            LicensePlateDTO.class
        );

        // Validate the LicensePlate in the database
        assertIncrementedRepositoryCount(databaseSizeBeforeCreate);
        var returnedLicensePlate = licensePlateMapper.toEntity(returnedLicensePlateDTO);
        assertLicensePlateUpdatableFieldsEquals(returnedLicensePlate, getPersistedLicensePlate(returnedLicensePlate));
    }

    @Test
    @Transactional
    void createLicensePlateWithExistingId() throws Exception {
        // Create the LicensePlate with an existing ID
        licensePlate.setId(1L);
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        long databaseSizeBeforeCreate = getRepositoryCount();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLicensePlateMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(licensePlateDTO)))
            .andExpect(status().isBadRequest());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllLicensePlates() throws Exception {
        // Initialize the database
        licensePlateRepository.saveAndFlush(licensePlate);

        // Get all the licensePlateList
        restLicensePlateMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(licensePlate.getId().intValue())))
            .andExpect(jsonPath("$.[*].plateNumber").value(hasItem(DEFAULT_PLATE_NUMBER)));
    }

    @Test
    @Transactional
    void getLicensePlate() throws Exception {
        // Initialize the database
        licensePlateRepository.saveAndFlush(licensePlate);

        // Get the licensePlate
        restLicensePlateMockMvc
            .perform(get(ENTITY_API_URL_ID, licensePlate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(licensePlate.getId().intValue()))
            .andExpect(jsonPath("$.plateNumber").value(DEFAULT_PLATE_NUMBER));
    }

    @Test
    @Transactional
    void getNonExistingLicensePlate() throws Exception {
        // Get the licensePlate
        restLicensePlateMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLicensePlate() throws Exception {
        // Initialize the database
        licensePlateRepository.saveAndFlush(licensePlate);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the licensePlate
        LicensePlate updatedLicensePlate = licensePlateRepository.findById(licensePlate.getId()).orElseThrow();
        // Disconnect from session so that the updates on updatedLicensePlate are not directly saved in db
        em.detach(updatedLicensePlate);
        updatedLicensePlate.plateNumber(UPDATED_PLATE_NUMBER);
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(updatedLicensePlate);

        restLicensePlateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, licensePlateDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(licensePlateDTO))
            )
            .andExpect(status().isOk());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertPersistedLicensePlateToMatchAllProperties(updatedLicensePlate);
    }

    @Test
    @Transactional
    void putNonExistingLicensePlate() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        licensePlate.setId(longCount.incrementAndGet());

        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLicensePlateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, licensePlateDTO.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(licensePlateDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLicensePlate() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        licensePlate.setId(longCount.incrementAndGet());

        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicensePlateMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(om.writeValueAsBytes(licensePlateDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLicensePlate() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        licensePlate.setId(longCount.incrementAndGet());

        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicensePlateMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(om.writeValueAsBytes(licensePlateDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLicensePlateWithPatch() throws Exception {
        // Initialize the database
        licensePlateRepository.saveAndFlush(licensePlate);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the licensePlate using partial update
        LicensePlate partialUpdatedLicensePlate = new LicensePlate();
        partialUpdatedLicensePlate.setId(licensePlate.getId());

        partialUpdatedLicensePlate.plateNumber(UPDATED_PLATE_NUMBER);

        restLicensePlateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLicensePlate.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLicensePlate))
            )
            .andExpect(status().isOk());

        // Validate the LicensePlate in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLicensePlateUpdatableFieldsEquals(
            createUpdateProxyForBean(partialUpdatedLicensePlate, licensePlate),
            getPersistedLicensePlate(licensePlate)
        );
    }

    @Test
    @Transactional
    void fullUpdateLicensePlateWithPatch() throws Exception {
        // Initialize the database
        licensePlateRepository.saveAndFlush(licensePlate);

        long databaseSizeBeforeUpdate = getRepositoryCount();

        // Update the licensePlate using partial update
        LicensePlate partialUpdatedLicensePlate = new LicensePlate();
        partialUpdatedLicensePlate.setId(licensePlate.getId());

        partialUpdatedLicensePlate.plateNumber(UPDATED_PLATE_NUMBER);

        restLicensePlateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLicensePlate.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(partialUpdatedLicensePlate))
            )
            .andExpect(status().isOk());

        // Validate the LicensePlate in the database

        assertSameRepositoryCount(databaseSizeBeforeUpdate);
        assertLicensePlateUpdatableFieldsEquals(partialUpdatedLicensePlate, getPersistedLicensePlate(partialUpdatedLicensePlate));
    }

    @Test
    @Transactional
    void patchNonExistingLicensePlate() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        licensePlate.setId(longCount.incrementAndGet());

        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLicensePlateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, licensePlateDTO.getId())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(licensePlateDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLicensePlate() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        licensePlate.setId(longCount.incrementAndGet());

        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicensePlateMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(om.writeValueAsBytes(licensePlateDTO))
            )
            .andExpect(status().isBadRequest());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLicensePlate() throws Exception {
        long databaseSizeBeforeUpdate = getRepositoryCount();
        licensePlate.setId(longCount.incrementAndGet());

        // Create the LicensePlate
        LicensePlateDTO licensePlateDTO = licensePlateMapper.toDto(licensePlate);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicensePlateMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(om.writeValueAsBytes(licensePlateDTO)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the LicensePlate in the database
        assertSameRepositoryCount(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLicensePlate() throws Exception {
        // Initialize the database
        licensePlateRepository.saveAndFlush(licensePlate);

        long databaseSizeBeforeDelete = getRepositoryCount();

        // Delete the licensePlate
        restLicensePlateMockMvc
            .perform(delete(ENTITY_API_URL_ID, licensePlate.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        assertDecrementedRepositoryCount(databaseSizeBeforeDelete);
    }

    protected long getRepositoryCount() {
        return licensePlateRepository.count();
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

    protected LicensePlate getPersistedLicensePlate(LicensePlate licensePlate) {
        return licensePlateRepository.findById(licensePlate.getId()).orElseThrow();
    }

    protected void assertPersistedLicensePlateToMatchAllProperties(LicensePlate expectedLicensePlate) {
        assertLicensePlateAllPropertiesEquals(expectedLicensePlate, getPersistedLicensePlate(expectedLicensePlate));
    }

    protected void assertPersistedLicensePlateToMatchUpdatableProperties(LicensePlate expectedLicensePlate) {
        assertLicensePlateAllUpdatablePropertiesEquals(expectedLicensePlate, getPersistedLicensePlate(expectedLicensePlate));
    }
}
