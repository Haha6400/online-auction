package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class AuctionRoomTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static AuctionRoom getAuctionRoomSample1() {
        return new AuctionRoom().id(1L).description("description1").initPrice(1L);
    }

    public static AuctionRoom getAuctionRoomSample2() {
        return new AuctionRoom().id(2L).description("description2").initPrice(2L);
    }

    public static AuctionRoom getAuctionRoomRandomSampleGenerator() {
        return new AuctionRoom()
            .id(longCount.incrementAndGet())
            .description(UUID.randomUUID().toString())
            .initPrice(longCount.incrementAndGet());
    }
}
