package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.AuctionRoom;
import com.mycompany.myapp.domain.Bid;
import com.mycompany.myapp.domain.LicensePlate;
import com.mycompany.myapp.domain.Province;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.domain.VehicleType;
import com.mycompany.myapp.service.dto.AuctionRoomDTO;
import com.mycompany.myapp.service.dto.BidDTO;
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
    date = "2024-05-05T22:42:57+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 18.0.2 (Oracle Corporation)"
)
@Component
public class BidMapperImpl implements BidMapper {

    @Override
    public Bid toEntity(BidDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Bid bid = new Bid();

        bid.setId( dto.getId() );
        bid.setAmount( dto.getAmount() );
        bid.setTimestamp( dto.getTimestamp() );
        bid.user( userDTOToUser( dto.getUser() ) );
        bid.auctionRoom( auctionRoomDTOToAuctionRoom( dto.getAuctionRoom() ) );

        return bid;
    }

    @Override
    public List<Bid> toEntity(List<BidDTO> dtoList) {
        if ( dtoList == null ) {
            return null;
        }

        List<Bid> list = new ArrayList<Bid>( dtoList.size() );
        for ( BidDTO bidDTO : dtoList ) {
            list.add( toEntity( bidDTO ) );
        }

        return list;
    }

    @Override
    public List<BidDTO> toDto(List<Bid> entityList) {
        if ( entityList == null ) {
            return null;
        }

        List<BidDTO> list = new ArrayList<BidDTO>( entityList.size() );
        for ( Bid bid : entityList ) {
            list.add( toDto( bid ) );
        }

        return list;
    }

    @Override
    public void partialUpdate(Bid entity, BidDTO dto) {
        if ( dto == null ) {
            return;
        }

        if ( dto.getId() != null ) {
            entity.setId( dto.getId() );
        }
        if ( dto.getAmount() != null ) {
            entity.setAmount( dto.getAmount() );
        }
        if ( dto.getTimestamp() != null ) {
            entity.setTimestamp( dto.getTimestamp() );
        }
        if ( dto.getUser() != null ) {
            if ( entity.getUser() == null ) {
                entity.user( new User() );
            }
            userDTOToUser1( dto.getUser(), entity.getUser() );
        }
        if ( dto.getAuctionRoom() != null ) {
            if ( entity.getAuctionRoom() == null ) {
                entity.auctionRoom( new AuctionRoom() );
            }
            auctionRoomDTOToAuctionRoom1( dto.getAuctionRoom(), entity.getAuctionRoom() );
        }
    }

    @Override
    public BidDTO toDto(Bid s) {
        if ( s == null ) {
            return null;
        }

        BidDTO bidDTO = new BidDTO();

        bidDTO.setUser( toDtoUserLogin( s.getUser() ) );
        bidDTO.setAuctionRoom( toDtoAuctionRoomId( s.getAuctionRoom() ) );
        bidDTO.setId( s.getId() );
        bidDTO.setAmount( s.getAmount() );
        bidDTO.setTimestamp( s.getTimestamp() );

        return bidDTO;
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

    @Override
    public AuctionRoomDTO toDtoAuctionRoomId(AuctionRoom auctionRoom) {
        if ( auctionRoom == null ) {
            return null;
        }

        AuctionRoomDTO auctionRoomDTO = new AuctionRoomDTO();

        auctionRoomDTO.setId( auctionRoom.getId() );

        return auctionRoomDTO;
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

    protected LicensePlate licensePlateDTOToLicensePlate(LicensePlateDTO licensePlateDTO) {
        if ( licensePlateDTO == null ) {
            return null;
        }

        LicensePlate licensePlate = new LicensePlate();

        licensePlate.setId( licensePlateDTO.getId() );
        licensePlate.setPlateNumber( licensePlateDTO.getPlateNumber() );
        licensePlate.vehicleType( vehicleTypeDTOToVehicleType( licensePlateDTO.getVehicleType() ) );
        licensePlate.province( provinceDTOToProvince( licensePlateDTO.getProvince() ) );

        return licensePlate;
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

    protected AuctionRoom auctionRoomDTOToAuctionRoom(AuctionRoomDTO auctionRoomDTO) {
        if ( auctionRoomDTO == null ) {
            return null;
        }

        AuctionRoom auctionRoom = new AuctionRoom();

        auctionRoom.setId( auctionRoomDTO.getId() );
        auctionRoom.setDescription( auctionRoomDTO.getDescription() );
        auctionRoom.setStartTime( auctionRoomDTO.getStartTime() );
        auctionRoom.setEndTime( auctionRoomDTO.getEndTime() );
        auctionRoom.setInitPrice( auctionRoomDTO.getInitPrice() );
        auctionRoom.licensePlate( licensePlateDTOToLicensePlate( auctionRoomDTO.getLicensePlate() ) );
        auctionRoom.users( userDTOSetToUserSet( auctionRoomDTO.getUsers() ) );

        return auctionRoom;
    }

    protected void userDTOToUser1(UserDTO userDTO, User mappingTarget) {
        if ( userDTO == null ) {
            return;
        }

        if ( userDTO.getId() != null ) {
            mappingTarget.setId( userDTO.getId() );
        }
        if ( userDTO.getLogin() != null ) {
            mappingTarget.setLogin( userDTO.getLogin() );
        }
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

    protected void licensePlateDTOToLicensePlate1(LicensePlateDTO licensePlateDTO, LicensePlate mappingTarget) {
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
            vehicleTypeDTOToVehicleType1( licensePlateDTO.getVehicleType(), mappingTarget.getVehicleType() );
        }
        if ( licensePlateDTO.getProvince() != null ) {
            if ( mappingTarget.getProvince() == null ) {
                mappingTarget.province( new Province() );
            }
            provinceDTOToProvince1( licensePlateDTO.getProvince(), mappingTarget.getProvince() );
        }
    }

    protected void auctionRoomDTOToAuctionRoom1(AuctionRoomDTO auctionRoomDTO, AuctionRoom mappingTarget) {
        if ( auctionRoomDTO == null ) {
            return;
        }

        if ( auctionRoomDTO.getId() != null ) {
            mappingTarget.setId( auctionRoomDTO.getId() );
        }
        if ( auctionRoomDTO.getDescription() != null ) {
            mappingTarget.setDescription( auctionRoomDTO.getDescription() );
        }
        if ( auctionRoomDTO.getStartTime() != null ) {
            mappingTarget.setStartTime( auctionRoomDTO.getStartTime() );
        }
        if ( auctionRoomDTO.getEndTime() != null ) {
            mappingTarget.setEndTime( auctionRoomDTO.getEndTime() );
        }
        if ( auctionRoomDTO.getInitPrice() != null ) {
            mappingTarget.setInitPrice( auctionRoomDTO.getInitPrice() );
        }
        if ( auctionRoomDTO.getLicensePlate() != null ) {
            if ( mappingTarget.getLicensePlate() == null ) {
                mappingTarget.licensePlate( new LicensePlate() );
            }
            licensePlateDTOToLicensePlate1( auctionRoomDTO.getLicensePlate(), mappingTarget.getLicensePlate() );
        }
        if ( mappingTarget.getUsers() != null ) {
            Set<User> set = userDTOSetToUserSet( auctionRoomDTO.getUsers() );
            if ( set != null ) {
                mappingTarget.getUsers().clear();
                mappingTarget.getUsers().addAll( set );
            }
        }
        else {
            Set<User> set = userDTOSetToUserSet( auctionRoomDTO.getUsers() );
            if ( set != null ) {
                mappingTarget.users( set );
            }
        }
    }
}
