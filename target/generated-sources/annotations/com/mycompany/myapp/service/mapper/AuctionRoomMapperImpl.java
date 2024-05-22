package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.Province;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.LicensePlateDTO;
import com.mycompany.myapp.service.dto.ProvinceDTO;
import com.mycompany.myapp.service.dto.UserDTO;
import com.mycompany.myapp.service.dto.VehicleTypeDTO;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-05T22:42:56+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 18.0.2 (Oracle Corporation)"
)
@Component
public class AuctionRoomMapperImpl implements AuctionRoomMapper {

    @Override
    public List<AuctionRoom> toEntity(List<AuctionRoomDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<AuctionRoom> list = new ArrayList<AuctionRoom>( dtoList.size() );
        for ( AuctionRoomDTO auctionRoomDTO : dtoList ) {
            list.add( toEntity( auctionRoomDTO ) );
        }

        return list;
    }

    @Override
    public List<AuctionRoomDTO> toDto(List<AuctionRoom> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<AuctionRoomDTO> list = new ArrayList<AuctionRoomDTO>( entityList.size() );
        for ( AuctionRoom auctionRoom : entityList ) {
            list.add( toDto( auctionRoom ) );
        }

        return list;
    }

    @Override
    public void partialUpdate(AuctionRoom entity, AuctionRoomDTO dto) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getDescription() != null ) {
            entity.setDescription( dto.getDescription() );
        }
        if ( dto.getStartTime() != null ) {
            entity.setStartTime( dto.getStartTime() );
        }
        if ( dto.getEndTime() != null ) {
            entity.setEndTime( dto.getEndTime() );
        }
        if ( dto.getInitPrice() != null ) {
            entity.setInitPrice( dto.getInitPrice() );
        }
        if ( dto.getLicensePlate() != null ) {
            if ( entity.getLicensePlate() == null ) {
                entity.licensePlate( new LicensePlate() );
            }
            licensePlateDTOToLicensePlate( dto.getLicensePlate(), entity.getLicensePlate() );
        }
        if ( entity.getUsers() != null ) {
            Set<User> set = userDTOSetToUserSet( dto.getUsers() );
            if ( set != null ) {
                entity.getUsers().clear();
                entity.getUsers().addAll( set );
            }
        }
        else {
            Set<User> set = userDTOSetToUserSet( dto.getUsers() );
            if ( set != null ) {
                entity.users( set );
            }
        }
    }

    @Override
    public AuctionRoomDTO toDto(AuctionRoom s) {
        if ( s == null ) {
            return null;
        }

        AuctionRoomDTO auctionRoomDTO = new AuctionRoomDTO();

        auctionRoomDTO.setLicensePlate( toDtoLicensePlateId( s.getLicensePlate() ) );
        auctionRoomDTO.setUsers( toDtoUserLoginSet( s.getUsers() ) );
        auctionRoomDTO.setId( s.getId() );
        auctionRoomDTO.setDescription( s.getDescription() );
        auctionRoomDTO.setStartTime( s.getStartTime() );
        auctionRoomDTO.setEndTime( s.getEndTime() );
        auctionRoomDTO.setInitPrice( s.getInitPrice() );

        return auctionRoomDTO;
    }

    @Override
    public AuctionRoom toEntity(AuctionRoomDTO auctionRoomDTO) {
        if ( auctionRoomDTO == null ) {
            return null;
        }

        AuctionRoom auctionRoom = new AuctionRoom();

        auctionRoom.setId( auctionRoomDTO.getId() );
        auctionRoom.setDescription( auctionRoomDTO.getDescription() );
        auctionRoom.setStartTime( auctionRoomDTO.getStartTime() );
        auctionRoom.setEndTime( auctionRoomDTO.getEndTime() );
        auctionRoom.setInitPrice( auctionRoomDTO.getInitPrice() );
        auctionRoom.licensePlate( licensePlateDTOToLicensePlate1( auctionRoomDTO.getLicensePlate() ) );
        auctionRoom.users( userDTOSetToUserSet( auctionRoomDTO.getUsers() ) );

        return auctionRoom;
    }

    @Override
    public LicensePlateDTO toDtoLicensePlateId(LicensePlate licensePlate) {
        if ( licensePlate == null ) {
            return null;
        }

        LicensePlateDTO licensePlateDTO = new LicensePlateDTO();

        licensePlateDTO.setId( licensePlate.getId() );

        return licensePlateDTO;
    }

    @Override
    public UserDTO toDtoUserLogin(User user) {
        if ( user == null ) {
            return null;
        }

        UserDTO userDTO = new UserDTO();

        userDTO.setId( user.getId() );
        userDTO.setLogin( user.getLogin() );

        return userDTO;
    }

    protected void vehicleTypeDTOToVehicleType(VehicleTypeDTO vehicleTypeDTO, VehicleType mappingTarget) {
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

    protected void provinceDTOToProvince(ProvinceDTO provinceDTO, Province mappingTarget) {
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

    protected void licensePlateDTOToLicensePlate(LicensePlateDTO licensePlateDTO, LicensePlate mappingTarget) {
        if ( licensePlateDTO == null ) {
            return;
        }

        if ( licensePlateDTO.getId() != null ) {
            mappingTarget.setId( licensePlateDTO.getId() );
        }
        if ( licensePlateDTO.getPlateNumber() != null ) {
            mappingTarget.setPlateNumber( licensePlateDTO.getPlateNumber() );
        }
        if ( licensePlateDTO.getVehicleType() != null ) {
            if ( mappingTarget.getVehicleType() == null ) {
                mappingTarget.vehicleType( new VehicleType() );
            }
            vehicleTypeDTOToVehicleType( licensePlateDTO.getVehicleType(), mappingTarget.getVehicleType() );
        }
        if ( licensePlateDTO.getProvince() != null ) {
            if ( mappingTarget.getProvince() == null ) {
                mappingTarget.province( new Province() );
            }
            provinceDTOToProvince( licensePlateDTO.getProvince(), mappingTarget.getProvince() );
        }
    }

    protected User userDTOToUser(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( userDTO.getId() );
        user.setLogin( userDTO.getLogin() );

        return user;
    }

    protected Set<User> userDTOSetToUserSet(Set<UserDTO> set) {
        if ( set == null ) {
            return null;
        }

        Set<User> set1 = new LinkedHashSet<User>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( UserDTO userDTO : set ) {
            set1.add( userDTOToUser( userDTO ) );
        }

        return set1;
    }

    protected VehicleType vehicleTypeDTOToVehicleType1(VehicleTypeDTO vehicleTypeDTO) {
        if ( vehicleTypeDTO == null ) {
            return null;
        }

        VehicleType vehicleType = new VehicleType();

        vehicleType.setId( vehicleTypeDTO.getId() );
        vehicleType.setName( vehicleTypeDTO.getName() );

        return vehicleType;
    }

    protected Province provinceDTOToProvince1(ProvinceDTO provinceDTO) {
        if ( provinceDTO == null ) {
            return null;
        }

        Province province = new Province();

        province.setId( provinceDTO.getId() );
        province.setName( provinceDTO.getName() );

        return province;
    }

    protected LicensePlate licensePlateDTOToLicensePlate1(LicensePlateDTO licensePlateDTO) {
        if ( licensePlateDTO == null ) {
            return null;
        }

        LicensePlate licensePlate = new LicensePlate();

        licensePlate.setId( licensePlateDTO.getId() );
        licensePlate.setPlateNumber( licensePlateDTO.getPlateNumber() );
        licensePlate.vehicleType( vehicleTypeDTOToVehicleType1( licensePlateDTO.getVehicleType() ) );
        licensePlate.province( provinceDTOToProvince1( licensePlateDTO.getProvince() ) );

        return licensePlate;
    }
}
