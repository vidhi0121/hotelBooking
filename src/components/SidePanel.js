import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {useLocation} from 'react-router-dom'

const SideContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width:200px;
    height:450px;
    margin-left:20px;
    margin-right:30px;
    border:1px solid black;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(27, 37, 86, 0.16);
    padding-left: 10px;
`

const LinkContainer = styled(Link)`
   color:${({routed})=>routed ==="true" ?'blue':'black'};
   margin: 5px;
   text-decoration: none;
`
const SidePanel = () =>{
    const location = useLocation();
    return(
        <SideContainer>
            <LinkContainer to='/' routed={location.pathname === '/'?"true":"false"}>Home</LinkContainer>
            <LinkContainer to='/addbooking' routed={location.pathname === '/addbooking'?"true":"false"}>Add Booking</LinkContainer>
            <LinkContainer to='/check' routed={location.pathname === '/check'?"true":"false"}>Check Room</LinkContainer>
        </SideContainer>
        
    )
}

export default SidePanel;