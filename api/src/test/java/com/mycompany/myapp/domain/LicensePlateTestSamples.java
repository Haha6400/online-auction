package com.mycompany.myapp.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class LicensePlateTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static LicensePlate getLicensePlateSample1() {
        return new LicensePlate().id(1L).plateNumber("plateNumber1");
    }

    public static LicensePlate getLicensePlateSample2() {
        return new LicensePlate().id(2L).plateNumber("plateNumber2");
    }

    public static LicensePlate getLicensePlateRandomSampleGenerator() {
        return new LicensePlate().id(longCount.incrementAndGet()).plateNumber(UUID.randomUUID().toString());
    }
}
