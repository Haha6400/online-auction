package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(VehicleType.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class VehicleType_ {

	
	/**
	 * @see com.mycompany.myapp.domain.VehicleType#name
	 **/
	public static volatile SingularAttribute<VehicleType, String> name;
	
	/**
	 * @see com.mycompany.myapp.domain.VehicleType#licensePlates
	 **/
	public static volatile SetAttribute<VehicleType, LicensePlate> licensePlates;
	
	/**
	 * @see com.mycompany.myapp.domain.VehicleType#id
	 **/
	public static volatile SingularAttribute<VehicleType, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.VehicleType
	 **/
	public static volatile EntityType<VehicleType> class_;

	public static final String NAME = "name";
	public static final String LICENSE_PLATES = "licensePlates";
	public static final String ID = "id";

}

