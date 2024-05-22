package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import java.util.Optional;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LicensePlate} and its DTO {@link LicensePlateDTO}.
 */
@Mapper(componentModel = "spring")
public interface LicensePlateMapper extends EntityMapper<LicensePlateDTO, LicensePlate> {
    LicensePlateDTO toDto(LicensePlate licensePlate);
}
