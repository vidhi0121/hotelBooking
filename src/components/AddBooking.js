import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import Card from './Card';
import styled from 'styled-components';
import {mockedGetApi, postMockData} from '../utils/mockApi';
import { useGetBookedRooms } from '../customHooks/useGetBookedRooms';
import { useGetRoomOptions } from '../customHooks/useGetRoomOptions';
import { useDispatch } from 'react-redux';

export const Form = styled.form`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`
export const RowWrapper = styled.div`
    display: flex;
    justify-content:center;
    align-items:center;
    margin: 8px;
`

const StyledInput = styled.input`
    width: 200px;
    margin-left: 20px;
`
export const StyledSelect = styled.select`
    width: 208px;
    height: 22px;
    margin-left: 20px;
`

export const FieldLabel = styled.div`
    width: 80px;
    text-align: right;
`
export const Button = styled.input`
    width:100px;
    height:30px;
    margin-top:10px;
    margin-right:10px;
    border: 1px solid #118eed;
    border-radius: 5px;
    box-shadow: 0 6px 12px rgb(17, 142, 237,0.2);
    background-color: rgb(17, 142, 237,0.16);
    cursor: pointer;

`

export const DatePickerWrapper = styled(({ className, ...props }) => (
    <DatePicker {...props} wrapperClassName={className} />
))`
    width: 208px;
    margin-left: 20px;
    input{
        width:200px;
        margin-left:0px;
    }
  `;

export const Calendar = styled.div`
   border-radius: 10px;
   box-shadow: 0 6px 12px rgba(27, 37, 86, 0.16);
   overflow: hidden;
 `;

export const Popper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: `

const AddBooking = () => {
    const [selectedDate, setselectedDate] = useState(null);
    const [surname, setSurname] = useState("");
    const [room, setRoom] = useState("");
    const [totalRoom, setTotalRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mockBookedRoom,setMockBookedRoom] = useState(null);

    const roomOptions = useGetRoomOptions()
    const bookedRooms = useGetBookedRooms()

    const dispatch = useDispatch();

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
        if (!surname || !room || !selectedDate) {
            return toast.warning(
                'Please fill all the fields',
                { position: toast.POSITION.TOP_RIGHT }
            )
        }
        const selectedRoom = parseInt(room)
        const bookingDate = selectedDate.toDateString()
        const isRoomNotAvailable = mockBookedRoom.find(eachRoom => (eachRoom.room === selectedRoom) && (eachRoom.date === bookingDate))
        if (isRoomNotAvailable) {
            return toast.error(
                "Room not available on this date.Please check availability",
                { position: toast.POSITION.TOP_RIGHT }
            );
        }

        const data = {
            surname,
            room: selectedRoom,
            date: bookingDate
        }

        setIsLoading(true);
        postMockData("ADD_BOOKING", data, dispatch).then(res => {
            setIsLoading(false);
            if (res.statusCode === 200) {
                toast.success(res.successMsg, {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            setRoom(null);
            setselectedDate(null);
            setSurname(null);
        })
    }

    return (
        <Card header="Add booking">
            {isLoading && <div style={{ display: 'flex', justifyContent: 'center' }}><LoadingSpinner /></div>}
            {!isLoading && <Form onSubmit={handleSubmit}>
                <RowWrapper>
                    <FieldLabel>Surname</FieldLabel>
                    <StyledInput type='text' onChange={e => setSurname(e.target.value)} />
                </RowWrapper>
                <RowWrapper>
                    <FieldLabel>Room</FieldLabel>
                    <StyledSelect onChange={e => setRoom(e.target.value)} defaultValue={'DEFAULT'} >
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
                <Button type='submit' value='Add' />
            </Form>}
        </Card>
    )
}

export default AddBooking;