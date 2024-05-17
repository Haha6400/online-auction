package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.repository.AuctionRoomRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.service.AuctionRoomService;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.service.mapper.AuctionRoomMapper;
import java.time.Instant;
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
    private final UserRepository userRepository;

    public AuctionRoomServiceImpl(
        AuctionRoomRepository auctionRoomRepository,
        AuctionRoomMapper auctionRoomMapper,
        UserRepository userRepository
    ) {
        this.auctionRoomRepository = auctionRoomRepository;
        this.auctionRoomMapper = auctionRoomMapper;
        this.userRepository = userRepository;
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
    public List<AuctionRoomDTO> findAll() {
        log.debug("Request to get all AuctionRooms");
        return auctionRoomRepository.findAll().stream().map(auctionRoomMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
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

    @Override
    public List<AuctionRoomDTO> getAllHistoryAuctionByUser(UserDTO userDTO, Instant date) {
        return auctionRoomMapper.toDto(
            auctionRoomRepository.findAllByUsersAndEndTimeBefore(userRepository.findOneById(userDTO.getId()), date)
        );
    }

    @Override
    public List<AuctionRoomDTO> getAuctionWaitlistByUser(UserDTO userDTO, Instant date) {
        return auctionRoomMapper.toDto(
            auctionRoomRepository.findAllByUsersAndStartTimeAfter(userRepository.findOneById(userDTO.getId()), date)
        );
    }

    @Override
    public List<AuctionRoomDTO> getAuctionsInProgressByUser(UserDTO userDTO, Instant date) {
        return auctionRoomMapper.toDto(
            auctionRoomRepository.findAllByUsersAndStartTimeBeforeAndEndTimeAfterOrderByStartTimeDesc(
                userRepository.findOneById(userDTO.getId()),
                date,
                date
            )
        );
    }

    @Override
    public List<AuctionRoomDTO> getAllOrderByCreatedDateDESC(UserDTO userDTO) {
        return auctionRoomMapper.toDto(
            auctionRoomRepository.findAllByUsersOrderByCreatedDateDesc(userRepository.findOneById(userDTO.getId()))
        );
    }

    @Override
    public Optional<AuctionRoomDTO> addUserToAuctionRoom(Long id, UserDTO userDTO) {
        Optional<AuctionRoomDTO> auctionRoomDTO = auctionRoomRepository.findById(id).map(auctionRoomMapper::toDto);
        if (auctionRoomDTO.isPresent()) {
            auctionRoomDTO.get().getUsers().add(userDTO);
            auctionRoomDTO.get().setUsers(auctionRoomDTO.get().getUsers());
        }
        return auctionRoomRepository
            .findById(id)
            .map(existingAuctionRoom -> {
                auctionRoomMapper.partialUpdate(existingAuctionRoom, auctionRoomDTO.get());

                return existingAuctionRoom;
            })
            .map(auctionRoomRepository::save)
            .map(auctionRoomMapper::toDto);
    }
}
