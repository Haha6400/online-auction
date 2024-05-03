// package com.mycompany.myapp.domain;

// import static com.mycompany.myapp.domain.LicensePlateTestSamples.*;
// import static com.mycompany.myapp.domain.VehicleTypeTestSamples.*;
// import static org.assertj.core.api.Assertions.assertThat;

// import com.mycompany.myapp.web.rest.TestUtil;
// import org.junit.jupiter.api.Test;

// class VehicleTypeTest {

//     @Test
//     void equalsVerifier() throws Exception {
//         TestUtil.equalsVerifier(VehicleType.class);
//         VehicleType vehicleType1 = getVehicleTypeSample1();
//         VehicleType vehicleType2 = new VehicleType();
//         assertThat(vehicleType1).isNotEqualTo(vehicleType2);

//         vehicleType2.setId(vehicleType1.getId());
//         assertThat(vehicleType1).isEqualTo(vehicleType2);

//         vehicleType2 = getVehicleTypeSample2();
//         assertThat(vehicleType1).isNotEqualTo(vehicleType2);
//     }

//     @Test
//     void licensePlateTest() throws Exception {
//         VehicleType vehicleType = getVehicleTypeRandomSampleGenerator();
//         LicensePlate licensePlateBack = getLicensePlateRandomSampleGenerator();

//         vehicleType.setLicensePlate(licensePlateBack);
//         assertThat(vehicleType.getLicensePlate()).isEqualTo(licensePlateBack);
//         assertThat(licensePlateBack.getVehicleType()).isEqualTo(vehicleType);

//         vehicleType.licensePlate(null);
//         assertThat(vehicleType.getLicensePlate()).isNull();
//         assertThat(licensePlateBack.getVehicleType()).isNull();
//     }
// }
