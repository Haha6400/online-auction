package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.domain.WinningBid;
import com.mycompany.myapp.domain.enumeration.PaymentStatus;
import com.mycompany.myapp.repository.AuctionRoomRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.repository.WinningBidRepository;
import com.mycompany.myapp.service.AuctionRoomService;
import com.mycompany.myapp.service.WinningBidService;
import com.mycompany.myapp.service.dto.*;
import com.mycompany.myapp.service.mapper.WinningBidMapper;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing
 * {@link com.mycompany.myapp.domain.WinningBid}.
 */
@Service
@Transactional
public class WinningBidServiceImpl implements WinningBidService {

    private final Logger log = LoggerFactory.getLogger(WinningBidServiceImpl.class);

    private final WinningBidRepository winningBidRepository;

    private final WinningBidMapper winningBidMapper;
    private final UserRepository userRepository;
    private final AuctionRoomRepository auctionRoomRepository;

    private List<CustomWinningBidResponse> result;

    public WinningBidServiceImpl(
            WinningBidRepository winningBidRepository,
            WinningBidMapper winningBidMapper,
            UserRepository userRepository,
            AuctionRoomRepository auctionRoomRepository) {
        this.winningBidRepository = winningBidRepository;
        this.winningBidMapper = winningBidMapper;
        this.userRepository = userRepository;
        this.auctionRoomRepository = auctionRoomRepository;
    }

    @Override
    public WinningBidDTO save(WinningBidDTO winningBidDTO) {
        log.debug("Request to save WinningBid : {}", winningBidDTO);
        WinningBid winningBid = winningBidMapper.toEntity(winningBidDTO);
        AuctionRoom auctionRoom = auctionRoomRepository.findById(winningBidDTO.getAuctionRoom().getId()).get();
        auctionRoom.setWinningBid(winningBid);
        auctionRoomRepository.save(auctionRoom);
        winningBid.setPaymentStatus(PaymentStatus.UNPAID);
        winningBid = winningBidRepository.save(winningBid);
        return winningBidMapper.toDto(winningBid);
    }

    @Override
    public WinningBidDTO update(WinningBidDTO winningBidDTO) {
        log.debug("Request to update WinningBid : {}", winningBidDTO);
        WinningBid winningBid = winningBidMapper.toEntity(winningBidDTO);
        winningBid = winningBidRepository.save(winningBid);
        return winningBidMapper.toDto(winningBid);
    }

    @Override
    public Optional<WinningBidDTO> partialUpdate(WinningBidDTO winningBidDTO, Long id) {
        log.debug("Request to partially update WinningBid : {}", winningBidDTO);

        return winningBidRepository
                .findById(id)
                .map(existingWinningBid -> {
                    winningBidMapper.partialUpdate(existingWinningBid, winningBidDTO);

                    return existingWinningBid;
                })
                .map(winningBidRepository::save)
                .map(winningBidMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public List<WinningBidDTO> findAll() {
        log.debug("Request to get all WinningBids");
        return winningBidRepository.findAll().stream().map(winningBidMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<WinningBidDTO> findOne(Long id) {
        log.debug("Request to get WinningBid : {}", id);
        return winningBidRepository.findById(id).map(winningBidMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete WinningBid : {}", id);
        winningBidRepository.deleteById(id);
    }

    @Override
    public List<CustomWinningBidResponse> findAllWinningLicenseByUsers(UserDTO userDTO) {
        result = new ArrayList<>();
        List<WinningBidDTO> tmp = winningBidRepository
                .findAllByBid_User(userRepository.findOneById(userDTO.getId()))
                .stream()
                .map(winningBidMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
        for (WinningBidDTO w : tmp) {
            result.add(setCustomLicense(w));
        }
        return result;
    }

    @Override
    public List<CustomWinningBidResponse> findAllWinningLicenseByStatus(UserDTO userDTO, PaymentStatus paymentStatus) {
        result = new ArrayList<>();
        List<WinningBidDTO> tmp = winningBidRepository
                .findAllByBid_User(userRepository.findOneById(userDTO.getId()))
                .stream()
                .filter(winningBid -> winningBid.getPaymentStatus() == paymentStatus)
                .map(winningBidMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));

        for (WinningBidDTO w : tmp) {
            result.add(setCustomLicense(w));
        }
        return result;
    }

    CustomWinningBidResponse setCustomLicense(WinningBidDTO winningBidDTO) {
        BidDTO bid = winningBidDTO.getBid();
        float finalPrice = bid.getPriceBeforeBidding() + bid.getPriceStep() * bid.getNumberOfPriceStep();
        CustomWinningBidResponse customWinningBidResponse = new CustomWinningBidResponse();
        customWinningBidResponse.setId(winningBidDTO.getId());
        return customWinningBidResponse.licenseToCustom(winningBidDTO.getAuctionRoom().getLicensePlate(), finalPrice);
    }
}
