// package com.mycompany.myapp.domain;

// import static com.mycompany.myapp.domain.LicensePlateTestSamples.*;
// import static com.mycompany.myapp.domain.ProvinceTestSamples.*;
// import static org.assertj.core.api.Assertions.assertThat;

// import com.mycompany.myapp.web.rest.TestUtil;
// import org.junit.jupiter.api.Test;

// class ProvinceTest {

//     @Test
//     void equalsVerifier() throws Exception {
//         TestUtil.equalsVerifier(Province.class);
//         Province province1 = getProvinceSample1();
//         Province province2 = new Province();
//         assertThat(province1).isNotEqualTo(province2);

//         province2.setId(province1.getId());
//         assertThat(province1).isEqualTo(province2);

//         province2 = getProvinceSample2();
//         assertThat(province1).isNotEqualTo(province2);
//     }

//     @Test
//     void licensePlateTest() throws Exception {
//         Province province = getProvinceRandomSampleGenerator();
//         LicensePlate licensePlateBack = getLicensePlateRandomSampleGenerator();

//         province.setLicensePlate(licensePlateBack);
//         assertThat(province.getLicensePlate()).isEqualTo(licensePlateBack);
//         assertThat(licensePlateBack.getProvince()).isEqualTo(province);

//         province.licensePlate(null);
//         assertThat(province.getLicensePlate()).isNull();
//         assertThat(licensePlateBack.getProvince()).isNull();
//     }
// }
