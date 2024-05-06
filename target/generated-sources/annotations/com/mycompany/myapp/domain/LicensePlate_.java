package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(LicensePlate.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class LicensePlate_ {

	
	/**
	 * @see com.mycompany.myapp.domain.LicensePlate#province
	 **/
	public static volatile SingularAttribute<LicensePlate, Province> province;
	
	/**
	 * @see com.mycompany.myapp.domain.LicensePlate#auctionRoom
	 **/
	public static volatile SingularAttribute<LicensePlate, AuctionRoom> auctionRoom;
	
	/**
	 * @see com.mycompany.myapp.domain.LicensePlate#id
	 **/
	public static volatile SingularAttribute<LicensePlate, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.LicensePlate#plateNumber
	 **/
	public static volatile SingularAttribute<LicensePlate, String> plateNumber;
	
	/**
	 * @see com.mycompany.myapp.domain.LicensePlate
	 **/
	public static volatile EntityType<LicensePlate> class_;
	
	/**
	 * @see com.mycompany.myapp.domain.LicensePlate#vehicleType
	 **/
	public static volatile SingularAttribute<LicensePlate, VehicleType> vehicleType;

	public static final String PROVINCE = "province";
	public static final String AUCTION_ROOM = "auctionRoom";
	public static final String ID = "id";
	public static final String PLATE_NUMBER = "plateNumber";
	public static final String VEHICLE_TYPE = "vehicleType";

}

