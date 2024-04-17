package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AuctionRoomTestSamples.*;
import static com.mycompany.myapp.domain.BidTestSamples.*;
import static com.mycompany.myapp.domain.LicensePlateTestSamples.*;
import static com.mycompany.myapp.domain.WinningBidTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class AuctionRoomTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuctionRoom.class);
        AuctionRoom auctionRoom1 = getAuctionRoomSample1();
        AuctionRoom auctionRoom2 = new AuctionRoom();
        assertThat(auctionRoom1).isNotEqualTo(auctionRoom2);

        auctionRoom2.setId(auctionRoom1.getId());
        assertThat(auctionRoom1).isEqualTo(auctionRoom2);

        auctionRoom2 = getAuctionRoomSample2();
        assertThat(auctionRoom1).isNotEqualTo(auctionRoom2);
    }

    @Test
    void bidTest() throws Exception {
        AuctionRoom auctionRoom = getAuctionRoomRandomSampleGenerator();
        Bid bidBack = getBidRandomSampleGenerator();

        auctionRoom.addBid(bidBack);
        assertThat(auctionRoom.getBids()).containsOnly(bidBack);
        assertThat(bidBack.getAuctionRoom()).isEqualTo(auctionRoom);

        auctionRoom.removeBid(bidBack);
        assertThat(auctionRoom.getBids()).doesNotContain(bidBack);
        assertThat(bidBack.getAuctionRoom()).isNull();

        auctionRoom.bids(new HashSet<>(Set.of(bidBack)));
        assertThat(auctionRoom.getBids()).containsOnly(bidBack);
        assertThat(bidBack.getAuctionRoom()).isEqualTo(auctionRoom);

        auctionRoom.setBids(new HashSet<>());
        assertThat(auctionRoom.getBids()).doesNotContain(bidBack);
        assertThat(bidBack.getAuctionRoom()).isNull();
    }

    @Test
    void winningBidTest() throws Exception {
        AuctionRoom auctionRoom = getAuctionRoomRandomSampleGenerator();
        WinningBid winningBidBack = getWinningBidRandomSampleGenerator();

        auctionRoom.setWinningBid(winningBidBack);
        assertThat(auctionRoom.getWinningBid()).isEqualTo(winningBidBack);
        assertThat(winningBidBack.getAuctionRoom()).isEqualTo(auctionRoom);

        auctionRoom.winningBid(null);
        assertThat(auctionRoom.getWinningBid()).isNull();
        assertThat(winningBidBack.getAuctionRoom()).isNull();
    }

    @Test
    void licensePlateTest() throws Exception {
        AuctionRoom auctionRoom = getAuctionRoomRandomSampleGenerator();
        LicensePlate licensePlateBack = getLicensePlateRandomSampleGenerator();

        auctionRoom.setLicensePlate(licensePlateBack);
        assertThat(auctionRoom.getLicensePlate()).isEqualTo(licensePlateBack);
        assertThat(licensePlateBack.getAuctionRoom()).isEqualTo(auctionRoom);

        auctionRoom.licensePlate(null);
        assertThat(auctionRoom.getLicensePlate()).isNull();
        assertThat(licensePlateBack.getAuctionRoom()).isNull();
    }
}
