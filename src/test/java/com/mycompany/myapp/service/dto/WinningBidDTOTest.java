package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class WinningBidDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(WinningBidDTO.class);
        WinningBidDTO winningBidDTO1 = new WinningBidDTO();
        winningBidDTO1.setId(1L);
        WinningBidDTO winningBidDTO2 = new WinningBidDTO();
        assertThat(winningBidDTO1).isNotEqualTo(winningBidDTO2);
        winningBidDTO2.setId(winningBidDTO1.getId());
        assertThat(winningBidDTO1).isEqualTo(winningBidDTO2);
        winningBidDTO2.setId(2L);
        assertThat(winningBidDTO1).isNotEqualTo(winningBidDTO2);
        winningBidDTO1.setId(null);
        assertThat(winningBidDTO1).isNotEqualTo(winningBidDTO2);
    }
}
