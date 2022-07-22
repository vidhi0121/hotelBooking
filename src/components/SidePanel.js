import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {useLocation} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai';
import {BsFillBookmarkPlusFill,BsFillQuestionCircleFill} from 'react-icons/bs'

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
   color:${({routed})=>routed ==="true" ?'#118eed':'black'};
   margin: 8px;
   text-decoration: none;
`
const PanelItemContainer = styled.div`
    display:flex;
    justify-content:flex-start;
    align-items:center;
    
`
const SidePanel = () =>{
    const location = useLocation();
    return(
        <SideContainer>
            <PanelItemContainer>
                <AiFillHome color='#118eed'/>
                <LinkContainer to='/' routed={location.pathname === '/'?"true":"false"}>Home</LinkContainer>
            </PanelItemContainer>
            <PanelItemContainer>
                <BsFillBookmarkPlusFill color='#118eed'/>
                <LinkContainer to='/addbooking' routed={location.pathname === '/addbooking'?"true":"false"}>Add Booking</LinkContainer>
            </PanelItemContainer>
            <PanelItemContainer>
                <BsFillQuestionCircleFill color='#118eed'/>
                <LinkContainer to='/check' routed={location.pathname === '/check'?"true":"false"}>Check Room</LinkContainer>
            </PanelItemContainer>  
        </SideContainer>
        
    )
}

export default SidePanel;