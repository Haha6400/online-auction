package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.repository.LicensePlateRepository;
import com.mycompany.myapp.service.LicensePlateService;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.mapper.LicensePlateMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.LicensePlate}.
 */
@Service
@Transactional
public class LicensePlateServiceImpl implements LicensePlateService {

    private final Logger log = LoggerFactory.getLogger(LicensePlateServiceImpl.class);

    private final LicensePlateRepository licensePlateRepository;

    private final LicensePlateMapper licensePlateMapper;

    public LicensePlateServiceImpl(LicensePlateRepository licensePlateRepository, LicensePlateMapper licensePlateMapper) {
        this.licensePlateRepository = licensePlateRepository;
        this.licensePlateMapper = licensePlateMapper;
    }

    @Override
    public LicensePlateDTO save(LicensePlateDTO licensePlateDTO) {
        log.debug("Request to save LicensePlate : {}", licensePlateDTO);
        LicensePlate licensePlate = licensePlateMapper.toEntity(licensePlateDTO);
        licensePlate = licensePlateRepository.save(licensePlate);
        return licensePlateMapper.toDto(licensePlate);
    }

    @Override
    public LicensePlateDTO update(LicensePlateDTO licensePlateDTO) {
        log.debug("Request to update LicensePlate : {}", licensePlateDTO);
        LicensePlate licensePlate = licensePlateMapper.toEntity(licensePlateDTO);
        licensePlate = licensePlateRepository.save(licensePlate);
        return licensePlateMapper.toDto(licensePlate);
    }

    @Override
    public Optional<LicensePlateDTO> partialUpdate(LicensePlateDTO licensePlateDTO) {
        log.debug("Request to partially update LicensePlate : {}", licensePlateDTO);

        return licensePlateRepository
            .findById(licensePlateDTO.getId())
            .map(existingLicensePlate -> {
                licensePlateMapper.partialUpdate(existingLicensePlate, licensePlateDTO);

                return existingLicensePlate;
            })
            .map(licensePlateRepository::save)
            .map(licensePlateMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LicensePlateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all LicensePlates");
        return licensePlateRepository.findAll(pageable).map(licensePlateMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<LicensePlateDTO> findOne(Long id) {
        log.debug("Request to get LicensePlate : {}", id);
        return licensePlateRepository.findById(id).map(licensePlateMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete LicensePlate : {}", id);
        licensePlateRepository.deleteById(id);
    }
}
