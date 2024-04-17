package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class WinningBidTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static WinningBid getWinningBidSample1() {
        return new WinningBid().id(1L);
    }

    public static WinningBid getWinningBidSample2() {
        return new WinningBid().id(2L);
    }

    public static WinningBid getWinningBidRandomSampleGenerator() {
        return new WinningBid().id(longCount.incrementAndGet());
    }
}
