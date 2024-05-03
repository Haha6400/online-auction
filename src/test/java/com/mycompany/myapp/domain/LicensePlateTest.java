package com.mycompany.myapp.domain;

import static com.mycompany.myapp.domain.AuctionRoomTestSamples.*;
import static com.mycompany.myapp.domain.LicensePlateTestSamples.*;
import static com.mycompany.myapp.domain.ProvinceTestSamples.*;
import static com.mycompany.myapp.domain.VehicleTypeTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class LicensePlateTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(LicensePlate.class);
        LicensePlate licensePlate1 = getLicensePlateSample1();
        LicensePlate licensePlate2 = new LicensePlate();
        assertThat(licensePlate1).isNotEqualTo(licensePlate2);

        licensePlate2.setId(licensePlate1.getId());
        assertThat(licensePlate1).isEqualTo(licensePlate2);

        licensePlate2 = getLicensePlateSample2();
        assertThat(licensePlate1).isNotEqualTo(licensePlate2);
    }

    @Test
    void provinceTest() throws Exception {
        LicensePlate licensePlate = getLicensePlateRandomSampleGenerator();
        Province provinceBack = getProvinceRandomSampleGenerator();

        licensePlate.setProvince(provinceBack);
        assertThat(licensePlate.getProvince()).isEqualTo(provinceBack);

        licensePlate.province(null);
        assertThat(licensePlate.getProvince()).isNull();
    }

    @Test
    void auctionRoomTest() throws Exception {
        LicensePlate licensePlate = getLicensePlateRandomSampleGenerator();
        AuctionRoom auctionRoomBack = getAuctionRoomRandomSampleGenerator();

        licensePlate.setAuctionRoom(auctionRoomBack);
        assertThat(licensePlate.getAuctionRoom()).isEqualTo(auctionRoomBack);
        assertThat(auctionRoomBack.getLicensePlate()).isEqualTo(licensePlate);

        licensePlate.auctionRoom(null);
        assertThat(licensePlate.getAuctionRoom()).isNull();
        assertThat(auctionRoomBack.getLicensePlate()).isNull();
    }

    @Test
    void vehicleTypeTest() throws Exception {
        LicensePlate licensePlate = getLicensePlateRandomSampleGenerator();
        VehicleType vehicleTypeBack = getVehicleTypeRandomSampleGenerator();

        licensePlate.setVehicleType(vehicleTypeBack);
        assertThat(licensePlate.getVehicleType()).isEqualTo(vehicleTypeBack);

        licensePlate.vehicleType(null);
        assertThat(licensePlate.getVehicleType()).isNull();
    }
}
