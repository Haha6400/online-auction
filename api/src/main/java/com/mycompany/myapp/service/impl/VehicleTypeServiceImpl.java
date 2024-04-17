package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.repository.VehicleTypeRepository;
import com.mycompany.myapp.service.VehicleTypeService;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import com.mycompany.myapp.service.mapper.VehicleTypeMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.VehicleType}.
 */
@Service
@Transactional
public class VehicleTypeServiceImpl implements VehicleTypeService {

    private final Logger log = LoggerFactory.getLogger(VehicleTypeServiceImpl.class);

    private final VehicleTypeRepository vehicleTypeRepository;

    private final VehicleTypeMapper vehicleTypeMapper;

    public VehicleTypeServiceImpl(VehicleTypeRepository vehicleTypeRepository, VehicleTypeMapper vehicleTypeMapper) {
        this.vehicleTypeRepository = vehicleTypeRepository;
        this.vehicleTypeMapper = vehicleTypeMapper;
    }

    @Override
    @Transactional
    public VehicleTypeDTO save(VehicleTypeDTO vehicleTypeDTO) {
        log.debug("Request to save VehicleType : {}", vehicleTypeDTO);
        VehicleType vehicleType = vehicleTypeMapper.toEntity(vehicleTypeDTO);
        vehicleType = vehicleTypeRepository.save(vehicleType);
        return vehicleTypeMapper.toDto(vehicleType);
    }

    @Override
    public VehicleTypeDTO update(VehicleTypeDTO vehicleTypeDTO) {
        log.debug("Request to update VehicleType : {}", vehicleTypeDTO);
        VehicleType vehicleType = vehicleTypeMapper.toEntity(vehicleTypeDTO);
        vehicleType = vehicleTypeRepository.save(vehicleType);
        return vehicleTypeMapper.toDto(vehicleType);
    }

    @Override
    public Optional<VehicleTypeDTO> partialUpdate(VehicleTypeDTO vehicleTypeDTO) {
        log.debug("Request to partially update VehicleType : {}", vehicleTypeDTO);

        return vehicleTypeRepository
            .findById(vehicleTypeDTO.getId())
            .map(existingVehicleType -> {
                vehicleTypeMapper.partialUpdate(existingVehicleType, vehicleTypeDTO);

                return existingVehicleType;
            })
            .map(vehicleTypeRepository::save)
            .map(vehicleTypeMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<VehicleTypeDTO> findAll() {
        log.debug("Request to get all VehicleTypes");
        return vehicleTypeRepository.findAll().stream().map(vehicleTypeMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the vehicleTypes where LicensePlate is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<VehicleTypeDTO> findAllWhereLicensePlateIsNull() {
        log.debug("Request to get all vehicleTypes where LicensePlate is null");
        return StreamSupport.stream(vehicleTypeRepository.findAll().spliterator(), false)
            .filter(vehicleType -> vehicleType.getLicensePlate() == null)
            .map(vehicleTypeMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VehicleTypeDTO> findOne(Long id) {
        log.debug("Request to get VehicleType : {}", id);
        return vehicleTypeRepository.findById(id).map(vehicleTypeMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete VehicleType : {}", id);
        vehicleTypeRepository.deleteById(id);
    }
}
