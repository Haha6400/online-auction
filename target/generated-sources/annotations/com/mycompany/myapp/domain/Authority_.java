package com.mycompany.myapp.domain;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Authority.class)
@Generated("org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
public abstract class Authority_ {

	
	/**
	 * @see com.mycompany.myapp.domain.Authority#name
	 **/
	public static volatile SingularAttribute<Authority, String> name;
	
	/**
	 * @see com.mycompany.myapp.domain.Authority
	 **/
	public static volatile EntityType<Authority> class_;

	public static final String NAME = "name";

}

