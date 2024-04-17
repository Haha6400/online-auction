package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;

public class BidTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Bid getBidSample1() {
        return new Bid().id(1L).amount(1L);
    }

    public static Bid getBidSample2() {
        return new Bid().id(2L).amount(2L);
    }

    public static Bid getBidRandomSampleGenerator() {
        return new Bid().id(longCount.incrementAndGet()).amount(longCount.incrementAndGet());
    }
}
