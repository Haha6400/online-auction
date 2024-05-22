package com.mycompany.myapp.web.websocket;

import com.mycompany.myapp.service.AuctionService;
import com.mycompany.myapp.service.dto.AuctionRoomWSDTO;
import com.mycompany.myapp.service.dto.BidDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.web.websocket.dto.AuctionRoomInitializeResponseDTO;
import com.mycompany.myapp.web.websocket.dto.BidResponseDTO;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.security.Principal;

@Controller
@CrossOrigin(origins = "*")
public class AuctionController {
    private final SimpMessageSendingOperations messageTemplate;

    private final AuctionService auctionService;

    public AuctionController(AuctionService auctionService, SimpMessageSendingOperations messageTemplate) {
        this.auctionService = auctionService;
        this.messageTemplate = messageTemplate;
    }

    @MessageMapping("/topic/bid")
    public void bid(@Payload BidDTO bidDTO, StompHeaderAccessor accessor, Principal principal) {
        System.out.println("BID");
        UserDTO user = new UserDTO();
        user.setLogin(principal.getName());
        System.out.println(user);
        bidDTO.setUser(user);
        bidDTO = auctionService.bid(bidDTO);
        System.out.println("!!!");
        if(bidDTO != null) {
            BidResponseDTO bidResDTO = new BidResponseDTO();
            bidResDTO.setBid(bidDTO);
            messageTemplate.convertAndSendToUser(principal.getName(), "/topic/auctionRoom/" + bidDTO.getAuctionRoom().getId(), bidResDTO);
        }
    }

    @SubscribeMapping("/topic/auctionRoom/{auctionRoomId}")
    public AuctionRoomInitializeResponseDTO initializeAuctionRoomData(@DestinationVariable("auctionRoomId") Long auctionRoomId, StompHeaderAccessor accessor, Principal principal) {
        System.out.println("SUBSCRIBE: " + auctionRoomId);
        AuctionRoomWSDTO auctionRoom = auctionService.getAuctionRoom(auctionRoomId);
        AuctionRoomInitializeResponseDTO auctionRoomInitRes = new AuctionRoomInitializeResponseDTO();
        auctionRoomInitRes.setAuctionRoom(auctionRoom);
        return auctionRoomInitRes;
    }

    @MessageMapping("/topic/hello")
    @SendTo("/topic/greeting")
    public String greeting(String name) {
        return "Hello, " + name;
    }

    @SubscribeMapping("/topic/test")
    public String test() {
        System.out.println("TEST SUB");
        return "TEST";
    }
}
