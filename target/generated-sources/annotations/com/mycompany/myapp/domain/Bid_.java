package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

@StaticMetamodel(Bid.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class Bid_ {

	
	/**
	 * @see com.mycompany.myapp.domain.Bid#amount
	 **/
	public static volatile SingularAttribute<Bid, Long> amount;
	
	/**
	 * @see com.mycompany.myapp.domain.Bid#winningBid
	 **/
	public static volatile SingularAttribute<Bid, WinningBid> winningBid;
	
	/**
	 * @see com.mycompany.myapp.domain.Bid#auctionRoom
	 **/
	public static volatile SingularAttribute<Bid, AuctionRoom> auctionRoom;
	
	/**
	 * @see com.mycompany.myapp.domain.Bid#id
	 **/
	public static volatile SingularAttribute<Bid, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.Bid
	 **/
	public static volatile EntityType<Bid> class_;
	
	/**
	 * @see com.mycompany.myapp.domain.Bid#user
	 **/
	public static volatile SingularAttribute<Bid, User> user;
	
	/**
	 * @see com.mycompany.myapp.domain.Bid#timestamp
	 **/
	public static volatile SingularAttribute<Bid, Instant> timestamp;

	public static final String AMOUNT = "amount";
	public static final String WINNING_BID = "winningBid";
	public static final String AUCTION_ROOM = "auctionRoom";
	public static final String ID = "id";
	public static final String USER = "user";
	public static final String TIMESTAMP = "timestamp";

}

