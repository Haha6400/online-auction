package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class VehicleTypeAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertVehicleTypeAllPropertiesEquals(VehicleType expected, VehicleType actual) {
        assertVehicleTypeAutoGeneratedPropertiesEquals(expected, actual);
        assertVehicleTypeAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertVehicleTypeAllUpdatablePropertiesEquals(VehicleType expected, VehicleType actual) {
        assertVehicleTypeUpdatableFieldsEquals(expected, actual);
        assertVehicleTypeUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertVehicleTypeAutoGeneratedPropertiesEquals(VehicleType expected, VehicleType actual) {
        assertThat(expected)
            .as("Verify VehicleType auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertVehicleTypeUpdatableFieldsEquals(VehicleType expected, VehicleType actual) {
        assertThat(expected)
            .as("Verify VehicleType relevant properties")
            .satisfies(e -> assertThat(e.getVehicleTypeID()).as("check vehicleTypeID").isEqualTo(actual.getVehicleTypeID()))
            .satisfies(e -> assertThat(e.getName()).as("check name").isEqualTo(actual.getName()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertVehicleTypeUpdatableRelationshipsEquals(VehicleType expected, VehicleType actual) {}
}
