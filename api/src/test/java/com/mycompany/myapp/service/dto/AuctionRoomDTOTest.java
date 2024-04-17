package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class AuctionRoomDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AuctionRoomDTO.class);
        AuctionRoomDTO auctionRoomDTO1 = new AuctionRoomDTO();
        auctionRoomDTO1.setId(1L);
        AuctionRoomDTO auctionRoomDTO2 = new AuctionRoomDTO();
        assertThat(auctionRoomDTO1).isNotEqualTo(auctionRoomDTO2);
        auctionRoomDTO2.setId(auctionRoomDTO1.getId());
        assertThat(auctionRoomDTO1).isEqualTo(auctionRoomDTO2);
        auctionRoomDTO2.setId(2L);
        assertThat(auctionRoomDTO1).isNotEqualTo(auctionRoomDTO2);
        auctionRoomDTO1.setId(null);
        assertThat(auctionRoomDTO1).isNotEqualTo(auctionRoomDTO2);
    }
}
