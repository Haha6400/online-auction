package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-05T22:42:57+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 18.0.2 (Oracle Corporation)"
)
@Component
public class VehicleTypeMapperImpl implements VehicleTypeMapper {

    @Override
    public VehicleType toEntity(VehicleTypeDTO dto) {
        if ( dto == null ) {
            return null;
        }

        VehicleType vehicleType = new VehicleType();

        vehicleType.setId( dto.getId() );
        vehicleType.setName( dto.getName() );

        return vehicleType;
    }

    @Override
    public VehicleTypeDTO toDto(VehicleType entity) {
        if ( entity == null ) {
            return null;
        }

        VehicleTypeDTO vehicleTypeDTO = new VehicleTypeDTO();

        vehicleTypeDTO.setId( entity.getId() );
        vehicleTypeDTO.setName( entity.getName() );

        return vehicleTypeDTO;
    }

    @Override
    public List<VehicleType> toEntity(List<VehicleTypeDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<VehicleType> list = new ArrayList<VehicleType>( dtoList.size() );
        for ( VehicleTypeDTO vehicleTypeDTO : dtoList ) {
            list.add( toEntity( vehicleTypeDTO ) );
        }

        return list;
    }

    @Override
    public List<VehicleTypeDTO> toDto(List<VehicleType> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<VehicleTypeDTO> list = new ArrayList<VehicleTypeDTO>( entityList.size() );
        for ( VehicleType vehicleType : entityList ) {
            list.add( toDto( vehicleType ) );
        }

        return list;
    }

    @Override
    public void partialUpdate(VehicleType entity, VehicleTypeDTO dto) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getName() != null ) {
            entity.setName( dto.getName() );
        }
    }
}
