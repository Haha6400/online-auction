package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.Province;
import com.mycompany.myapp.service.dto.ProvinceDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Province} and its DTO {@link ProvinceDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProvinceMapper extends EntityMapper<ProvinceDTO, Province> {}
