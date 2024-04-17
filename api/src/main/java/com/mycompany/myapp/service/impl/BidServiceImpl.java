package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.repository.BidRepository;
import com.mycompany.myapp.service.BidService;
import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.service.mapper.BidMapper;
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
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Bid}.
 */
@Service
@Transactional
public class BidServiceImpl implements BidService {

    private final Logger log = LoggerFactory.getLogger(BidServiceImpl.class);

    private final BidRepository bidRepository;

    private final BidMapper bidMapper;

    public BidServiceImpl(BidRepository bidRepository, BidMapper bidMapper) {
        this.bidRepository = bidRepository;
        this.bidMapper = bidMapper;
    }

    @Override
    public BidDTO save(BidDTO bidDTO) {
        log.debug("Request to save Bid : {}", bidDTO);
        Bid bid = bidMapper.toEntity(bidDTO);
        bid = bidRepository.save(bid);
        return bidMapper.toDto(bid);
    }

    @Override
    public BidDTO update(BidDTO bidDTO) {
        log.debug("Request to update Bid : {}", bidDTO);
        Bid bid = bidMapper.toEntity(bidDTO);
        bid = bidRepository.save(bid);
        return bidMapper.toDto(bid);
    }

    @Override
    public Optional<BidDTO> partialUpdate(BidDTO bidDTO) {
        log.debug("Request to partially update Bid : {}", bidDTO);

        return bidRepository
            .findById(bidDTO.getId())
            .map(existingBid -> {
                bidMapper.partialUpdate(existingBid, bidDTO);

                return existingBid;
            })
            .map(bidRepository::save)
            .map(bidMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<BidDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Bids");
        return bidRepository.findAll(pageable).map(bidMapper::toDto);
    }

    public Page<BidDTO> findAllWithEagerRelationships(Pageable pageable) {
        return bidRepository.findAllWithEagerRelationships(pageable).map(bidMapper::toDto);
    }

    /**
     *  Get all the bids where WinningBid is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<BidDTO> findAllWhereWinningBidIsNull() {
        log.debug("Request to get all bids where WinningBid is null");
        return StreamSupport.stream(bidRepository.findAll().spliterator(), false)
            .filter(bid -> bid.getWinningBid() == null)
            .map(bidMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<BidDTO> findOne(Long id) {
        log.debug("Request to get Bid : {}", id);
        return bidRepository.findOneWithEagerRelationships(id).map(bidMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Bid : {}", id);
        bidRepository.deleteById(id);
    }
}
