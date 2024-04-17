package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.LicensePlateAsserts.*;
import static com.mycompany.myapp.domain.LicensePlateTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class LicensePlateMapperTest {

    private LicensePlateMapper licensePlateMapper;

    @BeforeEach
    void setUp() {
        licensePlateMapper = new LicensePlateMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getLicensePlateSample1();
        var actual = licensePlateMapper.toEntity(licensePlateMapper.toDto(expected));
        assertLicensePlateAllPropertiesEquals(expected, actual);
    }
}
