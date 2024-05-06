package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Province.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class Province_ {

	
	/**
	 * @see com.mycompany.myapp.domain.Province#name
	 **/
	public static volatile SingularAttribute<Province, String> name;
	
	/**
	 * @see com.mycompany.myapp.domain.Province#licensePlates
	 **/
	public static volatile SetAttribute<Province, LicensePlate> licensePlates;
	
	/**
	 * @see com.mycompany.myapp.domain.Province#id
	 **/
	public static volatile SingularAttribute<Province, Long> id;
	
	/**
	 * @see com.mycompany.myapp.domain.Province
	 **/
	public static volatile EntityType<Province> class_;

	public static final String NAME = "name";
	public static final String LICENSE_PLATES = "licensePlates";
	public static final String ID = "id";

}

