package com.mycompany.myapp.service.mapper;

import static com.mycompany.myapp.domain.AuctionRoomAsserts.*;
import static com.mycompany.myapp.domain.AuctionRoomTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class AuctionRoomMapperTest {

    private AuctionRoomMapper auctionRoomMapper;

    @BeforeEach
    void setUp() {
        auctionRoomMapper = new AuctionRoomMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getAuctionRoomSample1();
        var actual = auctionRoomMapper.toEntity(auctionRoomMapper.toDto(expected));
        assertAuctionRoomAllPropertiesEquals(expected, actual);
    }
}
