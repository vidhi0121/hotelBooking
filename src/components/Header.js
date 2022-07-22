import {FaHotel} from 'react-icons/fa';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    display : flex;
    align-items: center;
    justify-content:flex-start;
    margin-left: 40px;
`

const Header = () => {
    return(
        <HeaderContainer>
            <FaHotel size={30} color='blue'/>
            <h2>Booking System</h2>
        </HeaderContainer>
    )
}

export default Header;