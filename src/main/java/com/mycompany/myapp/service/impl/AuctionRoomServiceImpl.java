package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.repository.AuctionRoomRepository;
import com.mycompany.myapp.service.AuctionRoomService;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.mapper.AuctionRoomMapper;
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
 * Service Implementation for managing {@link com.mycompany.myapp.domain.AuctionRoom}.
 */
@Service
@Transactional
public class AuctionRoomServiceImpl implements AuctionRoomService {

    private final Logger log = LoggerFactory.getLogger(AuctionRoomServiceImpl.class);

    private final AuctionRoomRepository auctionRoomRepository;

    private final AuctionRoomMapper auctionRoomMapper;

    public AuctionRoomServiceImpl(AuctionRoomRepository auctionRoomRepository, AuctionRoomMapper auctionRoomMapper) {
        this.auctionRoomRepository = auctionRoomRepository;
        this.auctionRoomMapper = auctionRoomMapper;
    }

    @Override
    public AuctionRoomDTO save(AuctionRoomDTO auctionRoomDTO) {
        log.debug("Request to save AuctionRoom : {}", auctionRoomDTO);
        AuctionRoom auctionRoom = auctionRoomMapper.toEntity(auctionRoomDTO);
        auctionRoom = auctionRoomRepository.save(auctionRoom);
        return auctionRoomMapper.toDto(auctionRoom);
    }

    @Override
    public AuctionRoomDTO update(AuctionRoomDTO auctionRoomDTO) {
        log.debug("Request to update AuctionRoom : {}", auctionRoomDTO);
        AuctionRoom auctionRoom = auctionRoomMapper.toEntity(auctionRoomDTO);
        auctionRoom = auctionRoomRepository.save(auctionRoom);
        return auctionRoomMapper.toDto(auctionRoom);
    }

    @Override
    public Optional<AuctionRoomDTO> partialUpdate(AuctionRoomDTO auctionRoomDTO) {
        log.debug("Request to partially update AuctionRoom : {}", auctionRoomDTO);

        return auctionRoomRepository
            .findById(auctionRoomDTO.getId())
            .map(existingAuctionRoom -> {
                auctionRoomMapper.partialUpdate(existingAuctionRoom, auctionRoomDTO);

                return existingAuctionRoom;
            })
            .map(auctionRoomRepository::save)
            .map(auctionRoomMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<AuctionRoomDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AuctionRooms");
        return auctionRoomRepository.findAll(pageable).map(auctionRoomMapper::toDto);
    }

    public Page<AuctionRoomDTO> findAllWithEagerRelationships(Pageable pageable) {
        return auctionRoomRepository.findAllWithEagerRelationships(pageable).map(auctionRoomMapper::toDto);
    }

    /**
     *  Get all the auctionRooms where WinningBid is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AuctionRoomDTO> findAllWhereWinningBidIsNull() {
        log.debug("Request to get all auctionRooms where WinningBid is null");
        return StreamSupport.stream(auctionRoomRepository.findAll().spliterator(), false)
            .filter(auctionRoom -> auctionRoom.getWinningBid() == null)
            .map(auctionRoomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get all the auctionRooms where LicensePlate is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<AuctionRoomDTO> findAllWhereLicensePlateIsNull() {
        log.debug("Request to get all auctionRooms where LicensePlate is null");
        return StreamSupport.stream(auctionRoomRepository.findAll().spliterator(), false)
            .filter(auctionRoom -> auctionRoom.getLicensePlate() == null)
            .map(auctionRoomMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<AuctionRoomDTO> findOne(Long id) {
        log.debug("Request to get AuctionRoom : {}", id);
        return auctionRoomRepository.findOneWithEagerRelationships(id).map(auctionRoomMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AuctionRoom : {}", id);
        auctionRoomRepository.deleteById(id);
    }
}
