package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.Province;
import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.ProvinceDTO;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-05T22:42:56+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 18.0.2 (Oracle Corporation)"
)
@Component
public class LicensePlateMapperImpl implements LicensePlateMapper {

    @Override
    public LicensePlate toEntity(LicensePlateDTO dto) {
        if ( dto == null ) {
            return null;
        }

        LicensePlate licensePlate = new LicensePlate();

        licensePlate.setId( dto.getId() );
        licensePlate.setPlateNumber( dto.getPlateNumber() );
        licensePlate.vehicleType( vehicleTypeDTOToVehicleType( dto.getVehicleType() ) );
        licensePlate.province( provinceDTOToProvince( dto.getProvince() ) );

        return licensePlate;
    }

    @Override
    public List<LicensePlate> toEntity(List<LicensePlateDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<LicensePlate> list = new ArrayList<LicensePlate>( dtoList.size() );
        for ( LicensePlateDTO licensePlateDTO : dtoList ) {
            list.add( toEntity( licensePlateDTO ) );
        }

        return list;
    }

    @Override
    public List<LicensePlateDTO> toDto(List<LicensePlate> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<LicensePlateDTO> list = new ArrayList<LicensePlateDTO>( entityList.size() );
        for ( LicensePlate licensePlate : entityList ) {
            list.add( toDto( licensePlate ) );
        }

        return list;
    }

    @Override
    public void partialUpdate(LicensePlate entity, LicensePlateDTO dto) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getPlateNumber() != null ) {
            entity.setPlateNumber( dto.getPlateNumber() );
        }
        if ( dto.getVehicleType() != null ) {
            if ( entity.getVehicleType() == null ) {
                entity.vehicleType( new VehicleType() );
            }
            vehicleTypeDTOToVehicleType1( dto.getVehicleType(), entity.getVehicleType() );
        }
        if ( dto.getProvince() != null ) {
            if ( entity.getProvince() == null ) {
                entity.province( new Province() );
            }
            provinceDTOToProvince1( dto.getProvince(), entity.getProvince() );
        }
    }

    @Override
    public LicensePlateDTO toDto(LicensePlate s) {
        if ( s == null ) {
            return null;
        }

        LicensePlateDTO licensePlateDTO = new LicensePlateDTO();

        licensePlateDTO.setVehicleType( toDtoVehicleTypeId( s.getVehicleType() ) );
        licensePlateDTO.setProvince( toDtoProvinceId( s.getProvince() ) );
        licensePlateDTO.setId( s.getId() );
        licensePlateDTO.setPlateNumber( s.getPlateNumber() );

        return licensePlateDTO;
    }

    @Override
    public VehicleTypeDTO toDtoVehicleTypeId(VehicleType vehicleType) {
        if ( vehicleType == null ) {
            return null;
        }

        VehicleTypeDTO vehicleTypeDTO = new VehicleTypeDTO();

        vehicleTypeDTO.setId( vehicleType.getId() );

        return vehicleTypeDTO;
    }

    @Override
    public ProvinceDTO toDtoProvinceId(Province province) {
        if ( province == null ) {
            return null;
        }

        ProvinceDTO provinceDTO = new ProvinceDTO();

        provinceDTO.setId( province.getId() );

        return provinceDTO;
    }

    protected VehicleType vehicleTypeDTOToVehicleType(VehicleTypeDTO vehicleTypeDTO) {
        if ( vehicleTypeDTO == null ) {
            return null;
        }

        VehicleType vehicleType = new VehicleType();

        vehicleType.setId( vehicleTypeDTO.getId() );
        vehicleType.setName( vehicleTypeDTO.getName() );

        return vehicleType;
    }

    protected Province provinceDTOToProvince(ProvinceDTO provinceDTO) {
        if ( provinceDTO == null ) {
            return null;
        }

        Province province = new Province();

        province.setId( provinceDTO.getId() );
        province.setName( provinceDTO.getName() );

        return province;
    }

    protected void vehicleTypeDTOToVehicleType1(VehicleTypeDTO vehicleTypeDTO, VehicleType mappingTarget) {
        if ( vehicleTypeDTO == null ) {
            return;
        }

        if ( vehicleTypeDTO.getId() != null ) {
            mappingTarget.setId( vehicleTypeDTO.getId() );
        }
        if ( vehicleTypeDTO.getName() != null ) {
            mappingTarget.setName( vehicleTypeDTO.getName() );
        }
    }

    protected void provinceDTOToProvince1(ProvinceDTO provinceDTO, Province mappingTarget) {
        if ( provinceDTO == null ) {
            return;
        }

        if ( provinceDTO.getId() != null ) {
            mappingTarget.setId( provinceDTO.getId() );
        }
        if ( provinceDTO.getName() != null ) {
            mappingTarget.setName( provinceDTO.getName() );
        }
    }
}
