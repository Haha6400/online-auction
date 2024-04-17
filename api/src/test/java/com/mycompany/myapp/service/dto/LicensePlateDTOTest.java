package com.mycompany.myapp.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LicensePlateDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LicensePlateDTO.class);
        LicensePlateDTO licensePlateDTO1 = new LicensePlateDTO();
        licensePlateDTO1.setId(1L);
        LicensePlateDTO licensePlateDTO2 = new LicensePlateDTO();
        assertThat(licensePlateDTO1).isNotEqualTo(licensePlateDTO2);
        licensePlateDTO2.setId(licensePlateDTO1.getId());
        assertThat(licensePlateDTO1).isEqualTo(licensePlateDTO2);
        licensePlateDTO2.setId(2L);
        assertThat(licensePlateDTO1).isNotEqualTo(licensePlateDTO2);
        licensePlateDTO1.setId(null);
        assertThat(licensePlateDTO1).isNotEqualTo(licensePlateDTO2);
    }
}
