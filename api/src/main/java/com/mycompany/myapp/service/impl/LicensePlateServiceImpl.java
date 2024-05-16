package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.repository.LicensePlateRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.LicensePlateService;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.service.mapper.LicensePlateMapper;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
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
    private final UserRepository userRepository;

    public LicensePlateServiceImpl(
        LicensePlateRepository licensePlateRepository,
        LicensePlateMapper licensePlateMapper,
        UserRepository userRepository
    ) {
        this.licensePlateRepository = licensePlateRepository;
        this.licensePlateMapper = licensePlateMapper;
        this.userRepository = userRepository;
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

    /**
     *  Get all the licensePlates where AuctionRoom is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<LicensePlateDTO> findAllWhereAuctionRoomIsNull() {
        log.debug("Request to get all licensePlates where AuctionRoom is null");
        return StreamSupport.stream(licensePlateRepository.findAll().spliterator(), false)
            .filter(licensePlate -> licensePlate.getAuctionRoom() == null)
            .map(licensePlateMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    //    @Transactional(readOnly = true)
    //    public List<LicensePlateDTO> test(UserDTO userDTO) {
    //        log.debug("Request to get all licensePlates where AuctionRoom is null");
    //        return StreamSupport.stream(licensePlateRepository.findAll().spliterator(), false)
    //            .filter(licensePlate ->
    //                licensePlate.getAuctionRoom().getBids() != null)
    //            .map(licensePlateMapper::toDto)
    //            .collect(Collectors.toCollection(LinkedList::new));
    //    }
    //.getWinningBid().getBid().getUser()
    //                    == userRepository.findOneByLogin(userDTO.getLogin()).get()
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
