package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.Province;
import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.ProvinceDTO;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link LicensePlate} and its DTO {@link LicensePlateDTO}.
 */
@Mapper(componentModel = "spring")
public interface LicensePlateMapper extends EntityMapper<LicensePlateDTO, LicensePlate> {
    @Mapping(target = "vehicleType", source = "vehicleType", qualifiedByName = "vehicleTypeId")
    @Mapping(target = "province", source = "province", qualifiedByName = "provinceId")
    LicensePlateDTO toDto(LicensePlate s);

    @Named("vehicleTypeId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    VehicleTypeDTO toDtoVehicleTypeId(VehicleType vehicleType);

    @Named("provinceId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ProvinceDTO toDtoProvinceId(Province province);
}
