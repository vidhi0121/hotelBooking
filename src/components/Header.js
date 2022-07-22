import {FaHotel} from 'react-icons/fa';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display : flex;
    align-items: center;
    justify-content:flex-start;
    margin-left: 40px;
    h2{
        margin-left:5px;
    }
`

const Header = () => {
    return(
        <HeaderContainer>
            <FaHotel size={30} color='#118eed'/>
            <h2>Booking System</h2>
        </HeaderContainer>
    )
}

export default Header;