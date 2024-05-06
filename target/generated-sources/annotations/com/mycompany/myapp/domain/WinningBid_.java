package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(WinningBid.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class WinningBid_ {

	
	/**
	 * @see com.mycompany.myapp.domain.WinningBid#auctionRoom
	 **/
	public static volatile SingularAttribute<WinningBid, AuctionRoom> auctionRoom;
	
	/**
	 * @see com.mycompany.myapp.domain.WinningBid#id
	 **/
	public static volatile SingularAttribute<WinningBid, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.WinningBid#bid
	 **/
	public static volatile SingularAttribute<WinningBid, Bid> bid;
	
	/**
	 * @see com.mycompany.myapp.domain.WinningBid
	 **/
	public static volatile EntityType<WinningBid> class_;
	
	/**
	 * @see com.mycompany.myapp.domain.WinningBid#paymentStatus
	 **/
	public static volatile SingularAttribute<WinningBid, Boolean> paymentStatus;

	public static final String AUCTION_ROOM = "auctionRoom";
	public static final String ID = "id";
	public static final String BID = "bid";
	public static final String PAYMENT_STATUS = "paymentStatus";

}

