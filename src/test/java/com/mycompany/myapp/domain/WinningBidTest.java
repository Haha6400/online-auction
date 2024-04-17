package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AuctionRoomTestSamples.*;
import static com.mycompany.myapp.domain.BidTestSamples.*;
import static com.mycompany.myapp.domain.WinningBidTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WinningBidTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(WinningBid.class);
        WinningBid winningBid1 = getWinningBidSample1();
        WinningBid winningBid2 = new WinningBid();
        assertThat(winningBid1).isNotEqualTo(winningBid2);

        winningBid2.setId(winningBid1.getId());
        assertThat(winningBid1).isEqualTo(winningBid2);

        winningBid2 = getWinningBidSample2();
        assertThat(winningBid1).isNotEqualTo(winningBid2);
    }

    @Test
    void auctionRoomTest() throws Exception {
        WinningBid winningBid = getWinningBidRandomSampleGenerator();
        AuctionRoom auctionRoomBack = getAuctionRoomRandomSampleGenerator();

        winningBid.setAuctionRoom(auctionRoomBack);
        assertThat(winningBid.getAuctionRoom()).isEqualTo(auctionRoomBack);

        winningBid.auctionRoom(null);
        assertThat(winningBid.getAuctionRoom()).isNull();
    }

    @Test
    void bidTest() throws Exception {
        WinningBid winningBid = getWinningBidRandomSampleGenerator();
        Bid bidBack = getBidRandomSampleGenerator();

        winningBid.setBid(bidBack);
        assertThat(winningBid.getBid()).isEqualTo(bidBack);

        winningBid.bid(null);
        assertThat(winningBid.getBid()).isNull();
    }
}
