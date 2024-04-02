package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AuctionRoomTestSamples.*;
import static com.mycompany.myapp.domain.BidTestSamples.*;
import static com.mycompany.myapp.domain.WinningBidTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BidTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bid.class);
        Bid bid1 = getBidSample1();
        Bid bid2 = new Bid();
        assertThat(bid1).isNotEqualTo(bid2);

        bid2.setId(bid1.getId());
        assertThat(bid1).isEqualTo(bid2);

        bid2 = getBidSample2();
        assertThat(bid1).isNotEqualTo(bid2);
    }

    @Test
    void winningBidTest() throws Exception {
        Bid bid = getBidRandomSampleGenerator();
        WinningBid winningBidBack = getWinningBidRandomSampleGenerator();

        bid.setWinningBid(winningBidBack);
        assertThat(bid.getWinningBid()).isEqualTo(winningBidBack);
        assertThat(winningBidBack.getBid()).isEqualTo(bid);

        bid.winningBid(null);
        assertThat(bid.getWinningBid()).isNull();
        assertThat(winningBidBack.getBid()).isNull();
    }

    @Test
    void auctionRoomTest() throws Exception {
        Bid bid = getBidRandomSampleGenerator();
        AuctionRoom auctionRoomBack = getAuctionRoomRandomSampleGenerator();

        bid.setAuctionRoom(auctionRoomBack);
        assertThat(bid.getAuctionRoom()).isEqualTo(auctionRoomBack);

        bid.auctionRoom(null);
        assertThat(bid.getAuctionRoom()).isNull();
    }
}
