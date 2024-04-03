package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.VehicleTypeAsserts.*;
import static com.mycompany.myapp.domain.VehicleTypeTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class VehicleTypeMapperTest {

    private VehicleTypeMapper vehicleTypeMapper;

    @BeforeEach
    void setUp() {
        vehicleTypeMapper = new VehicleTypeMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getVehicleTypeSample1();
        var actual = vehicleTypeMapper.toEntity(vehicleTypeMapper.toDto(expected));
        assertVehicleTypeAllPropertiesEquals(expected, actual);
    }
}
