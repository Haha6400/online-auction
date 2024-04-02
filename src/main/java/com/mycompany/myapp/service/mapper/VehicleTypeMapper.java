package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

/**
 * Mapper for the entity {@link VehicleType} and its DTO {@link VehicleTypeDTO}.
 */
@Mapper(componentModel = "spring")
@Component
public interface VehicleTypeMapper extends EntityMapper<VehicleTypeDTO, VehicleType> {}
