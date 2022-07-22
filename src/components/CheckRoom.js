import 'react-datepicker/dist/react-datepicker.css';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { FcOk } from 'react-icons/fc';
import { AiFillCloseCircle } from 'react-icons/ai'
import Card from './Card';
import { StyledSelect, DatePickerWrapper, RowWrapper, FieldLabel, Button, Form,Calendar,Popper } from './AddBooking'
import styled from 'styled-components';
import { mockedGetApi } from '../utils/mockApi';
import { useGetBookedRooms } from '../customHooks/useGetBookedRooms';
import { useGetRoomOptions } from '../customHooks/useGetRoomOptions';
import LoadingSpinner from './LoadingSpinner';

const IconContainer = styled.div`
    width: 40px;
    height: 40px;
    margin-top: 18px;
`

const MarginedRowWrapper = styled(RowWrapper)`
    margin: 0 0 0 50px;
`
const CheckRoom = () => {
    const [room, setRoom] = useState("");
    const [selectedDate, setselectedDate] = useState(null);
    const [isAvailable, setIsAvailable] = useState(null);
    const [totalRoom, setTotalRoom] = useState(null);
    const [mockBookedRoom,setMockBookedRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const roomOptions = useGetRoomOptions()
    const bookedRooms = useGetBookedRooms()

    useEffect(() => {
        setIsLoading(true);
        mockedGetApi(roomOptions).then(res => {
            setTotalRoom(res)
        })
        mockedGetApi(bookedRooms).then(res => {
            setMockBookedRoom(res)
            setIsLoading(false)
        })
    }, [roomOptions,bookedRooms])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!room || !selectedDate) {
            return toast.warning('Please fill all the fields', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        const selectedRoom = parseInt(room)
        const bookingDate = selectedDate.toDateString()
        const isRoomNotAvailable = mockBookedRoom.find(eachRoom => (eachRoom.room === selectedRoom) && (eachRoom.date === bookingDate))
        if (isRoomNotAvailable) {
            setIsAvailable(false)
        } else {
            setIsAvailable(true)
        }
    }

    const iconRenderer = () => {
        if(typeof isAvailable !== 'boolean') return;

        return ( isAvailable ? <FcOk size={30} /> : <AiFillCloseCircle size={30} color='red' />)
    }

    return (
        <Card header="Check Room">
            {isLoading && <div style={{ display: 'flex', justifyContent: 'center' }}><LoadingSpinner /></div>}
            {!isLoading && <Form onSubmit={handleSubmit}>
                <RowWrapper>
                    <FieldLabel>Room</FieldLabel>
                    <StyledSelect onChange={e => setRoom(e.target.value)}
                        defaultValue={'DEFAULT'} >
                        <option value="DEFAULT" disabled>Select Room</option>
                        {totalRoom && totalRoom.map((e, index) => <option key={index} value={e}>{e}</option>)}
                    </StyledSelect>
                </RowWrapper>
                <RowWrapper>
                <FieldLabel>Date</FieldLabel>
                <DatePickerWrapper
                    selected={selectedDate}
                    onChange={date => {
                        setselectedDate(date)
                    }}
                    dateFormat='dd/MM/yyyy'
                    minDate={new Date()}
                    popperContainer={Popper}
                    calendarContainer={Calendar}
                    placeholderText="Pick a Date"
                />
                </RowWrapper>
                <MarginedRowWrapper>
                    <Button type='submit' value='Check' />
                    <IconContainer>
                        {iconRenderer()}
                    </IconContainer>
                </MarginedRowWrapper>
            </Form>}
        </Card>
    )
}

export default CheckRoom;