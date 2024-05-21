package com.mycompany.myapp.service;



import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.WinningBid;
import com.mycompany.myapp.domain.enumeration.LicensePlateStatus;
import com.mycompany.myapp.domain.enumeration.PaymentStatus;
import com.mycompany.myapp.repository.*;
import com.mycompany.myapp.service.dto.AuctionRoomWSDTO;
import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.WinningBidDTO;
import com.mycompany.myapp.service.mapper.AuctionRoomWSMapper;
import com.mycompany.myapp.service.mapper.BidMapper;
import com.mycompany.myapp.service.mapper.LicensePlateMapper;
import com.mycompany.myapp.service.mapper.WinningBidMapper;
import com.mycompany.myapp.web.websocket.dto.UpdateBidResponseDTO;
import com.mycompany.myapp.web.websocket.dto.WinningBidResponseDTO;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
public class AuctionService {
    private final SimpMessageSendingOperations messageTemplate;
    private final AuctionRoomRepository auctionRoomRepository;

    private final BidRepository bidRepository;

    private final UserRepository userRepository;

    private final WinningBidRepository winningBidRepository;

    private final LicensePlateRepository licensePlateRepository;

    private final AuctionRoomWSMapper auctionRoomWSMapper;

    private final BidMapper bidMapper;

    private final WinningBidMapper winningBidMapper;

    private final LicensePlateMapper licensePlateMapper;

    private final Map<Long, AuctionRoomWSDTO> ongoingAuctionMap = new HashMap<>();
    public AuctionService(AuctionRoomRepository auctionRoomRepository,
                          BidRepository bidRepository,
                          UserRepository userRepository,
                          WinningBidRepository winningBidRepository,
                          LicensePlateRepository licensePlateRepository,
                          AuctionRoomWSMapper auctionRoomWSMapper,
                          BidMapper bidMapper,
                          WinningBidMapper winningBidMapper,
                          LicensePlateMapper licensePlateMapper,
                          SimpMessageSendingOperations messageTemplate) {
        this.auctionRoomRepository = auctionRoomRepository;
        this.bidRepository = bidRepository;
        this.userRepository = userRepository;
        this.winningBidRepository = winningBidRepository;
        this.licensePlateRepository = licensePlateRepository;
        this.auctionRoomWSMapper = auctionRoomWSMapper;
        this.bidMapper = bidMapper;
        this.winningBidMapper = winningBidMapper;
        this.licensePlateMapper = licensePlateMapper;
        this.messageTemplate = messageTemplate;


        LicensePlateDTO licensePlate = new LicensePlateDTO();
        licensePlate.setPlateNumber("29A-99999");
        licensePlate.setStatus(LicensePlateStatus.NOT_YET_AUCTIONED);
        licensePlate.setVehicleType("Ban Tai");
        licensePlate.setProvince("Ha Noi");
        licensePlateRepository.save(licensePlateMapper.toEntity(licensePlate));
        AuctionRoomWSDTO auctionRoom = new AuctionRoomWSDTO();
        auctionRoom.setStartTime(Instant.now());
        auctionRoom.setEndTime(Instant.now().plusSeconds(30));
        auctionRoom.setInitialPrice(0F);
        auctionRoom.setPriceStep(1F);
        auctionRoom.setLicensePlate(licensePlate);
        auctionRoom.setBids(new ArrayList<>());
        auctionRoomRepository.save(auctionRoomWSMapper.toEntity(auctionRoom));

    }

    public AuctionRoomWSDTO getAuctionRoom(Long auctionRoomId) {
        if(!ongoingAuctionMap.containsKey(auctionRoomId)) {
            fetchAuctionRoom(auctionRoomId);
        }
        return ongoingAuctionMap.get(auctionRoomId);
    }

    public BidDTO bid(BidDTO bidDTO) {
        AuctionRoomWSDTO auctionRoom = getAuctionRoom(bidDTO.getAuctionRoom().getId());
        User user = userRepository.findOneWithAuthoritiesByLogin(bidDTO.getUser().getLogin()).get();
        bidDTO.getUser().setId(user.getId());
        bidDTO.setEventTime(Instant.now());
        if(auctionRoom != null) {
            boolean flag = false;
            if (auctionRoom.getBids().isEmpty()) {
                if (Objects.equals(auctionRoom.getInitialPrice(), bidDTO.getPriceBeforeBidding()) &&
                    Objects.equals(auctionRoom.getPriceStep(), bidDTO.getPriceStep())) flag = true;
            } else {
                BidDTO lastBid = auctionRoom.getBids().get(auctionRoom.getBids().size() - 1);
                if (Objects.equals(bidDTO.getPriceBeforeBidding(), lastBid.getPriceBeforeBidding() + lastBid.getPriceStep() * lastBid.getNumberOfPriceStep()) &&
                    Objects.equals(bidDTO.getPriceStep(), auctionRoom.getPriceStep())) {
                    flag = true;
                }
            }
            if (flag) {
                Bid bid = bidMapper.toEntity(bidDTO);
                bid = bidRepository.save(bid);
                bidDTO = bidMapper.toDto(bid);
                UpdateBidResponseDTO updateBidRes = new UpdateBidResponseDTO();
                updateBidRes.setBid(bidDTO);
                auctionRoom.getBids().add(bidDTO);
                messageTemplate.convertAndSend("/topic/auctionRoom/" + updateBidRes.getBid().getAuctionRoom().getId(), updateBidRes);
                return bidDTO;
            }
        }
        return null;
    }

    private void fetchAuctionRoom(Long auctionRoomId) {
        Optional<AuctionRoomWSDTO> auctionRoomDTO =
            auctionRoomRepository.findById(auctionRoomId).map(auctionRoomWSMapper::toDto);
        if(auctionRoomDTO.isPresent()) {
            AuctionRoomWSDTO auctionRoom = auctionRoomDTO.get();
            if(auctionRoom.getEndTime().isAfter(Instant.now())) {
                ongoingAuctionMap.put(auctionRoom.getId(), auctionRoom);
                Timer timer = new Timer();
                TimerTask task = new TimerTask() {
                    @Override
                    public void run() {
                        ongoingAuctionMap.remove(auctionRoom.getId());
                        WinningBidDTO winningBidDTO = new WinningBidDTO();
                        winningBidDTO.setPaymentStatus(PaymentStatus.UNPAID);
                        winningBidDTO.setBid(auctionRoom.getBids().get(auctionRoom.getBids().size() - 1));
                        WinningBid winningBid= winningBidRepository.save(winningBidMapper.toEntity(winningBidDTO));
                        WinningBidResponseDTO winningBidResponseDTO= new WinningBidResponseDTO();
                        winningBidResponseDTO.setWinningBidDTO(winningBidMapper.toDto(winningBid));
                        messageTemplate.convertAndSend("/topic/auctionRoom/" + auctionRoomDTO.get().getId(), winningBidResponseDTO);
                    }
                };
                timer.schedule(task, Date.from(auctionRoomDTO.get().getEndTime()));
            }
        }
    }
}
