import { ToastContainer } from "react-toastify";
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px 10px 10px 10px;
    height:100%;
    
    
    
    p {
        text-align: left;
        padding-bottom: 5px;
        border-bottom: 0.5px solid black;

    }
`

const Card = ({header, children}) => {
    return (
        <Container>
            <ToastContainer />
            <p>{header}</p>
            <div>
                {children}
            </div>
        </Container>
    )
}

export default Card;