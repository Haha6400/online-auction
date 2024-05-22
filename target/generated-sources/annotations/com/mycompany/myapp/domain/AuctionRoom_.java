package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(AuctionRoom.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class AuctionRoom_ {

	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#licensePlate
	 **/
	public static volatile SingularAttribute<AuctionRoom, LicensePlate> licensePlate;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#winningBid
	 **/
	public static volatile SingularAttribute<AuctionRoom, WinningBid> winningBid;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#bids
	 **/
	public static volatile SetAttribute<AuctionRoom, Bid> bids;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#description
	 **/
	public static volatile SingularAttribute<AuctionRoom, String> description;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#initPrice
	 **/
	public static volatile SingularAttribute<AuctionRoom, Long> initPrice;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#startTime
	 **/
	public static volatile SingularAttribute<AuctionRoom, Instant> startTime;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#id
	 **/
	public static volatile SingularAttribute<AuctionRoom, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#endTime
	 **/
	public static volatile SingularAttribute<AuctionRoom, Instant> endTime;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom
	 **/
	public static volatile EntityType<AuctionRoom> class_;
	
	/**
	 * @see com.mycompany.myapp.domain.AuctionRoom#users
	 **/
	public static volatile SetAttribute<AuctionRoom, User> users;

	public static final String LICENSE_PLATE = "licensePlate";
	public static final String WINNING_BID = "winningBid";
	public static final String BIDS = "bids";
	public static final String DESCRIPTION = "description";
	public static final String INIT_PRICE = "initPrice";
	public static final String START_TIME = "startTime";
	public static final String ID = "id";
	public static final String END_TIME = "endTime";
	public static final String USERS = "users";

}

