package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.BidAsserts.*;
import static com.mycompany.myapp.domain.BidTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class BidMapperTest {

    private BidMapper bidMapper;

    @BeforeEach
    void setUp() {
        bidMapper = new BidMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getBidSample1();
        var actual = bidMapper.toEntity(bidMapper.toDto(expected));
        assertBidAllPropertiesEquals(expected, actual);
    }
}
