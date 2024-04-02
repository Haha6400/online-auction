package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.WinningBidAsserts.*;
import static com.mycompany.myapp.domain.WinningBidTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class WinningBidMapperTest {

    private WinningBidMapper winningBidMapper;

    @BeforeEach
    void setUp() {
        winningBidMapper = new WinningBidMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getWinningBidSample1();
        var actual = winningBidMapper.toEntity(winningBidMapper.toDto(expected));
        assertWinningBidAllPropertiesEquals(expected, actual);
    }
}
