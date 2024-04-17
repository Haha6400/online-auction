package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class BidDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(BidDTO.class);
        BidDTO bidDTO1 = new BidDTO();
        bidDTO1.setId(1L);
        BidDTO bidDTO2 = new BidDTO();
        assertThat(bidDTO1).isNotEqualTo(bidDTO2);
        bidDTO2.setId(bidDTO1.getId());
        assertThat(bidDTO1).isEqualTo(bidDTO2);
        bidDTO2.setId(2L);
        assertThat(bidDTO1).isNotEqualTo(bidDTO2);
        bidDTO1.setId(null);
        assertThat(bidDTO1).isNotEqualTo(bidDTO2);
    }
}
