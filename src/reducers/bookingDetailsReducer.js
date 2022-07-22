import { createReducer } from '@reduxjs/toolkit'
const initialState = {
    totalRooms: [101, 102, 201, 202, 301, 302],
    bookedRooms: [
        {
            surname: 'Vidhi',
            room: 102,
            date: null
        }
    ]
}

const bookingDetailsReducer = createReducer( initialState, {
   
         "ADD_BOOKING":(state,action)=>{
            state.bookedRooms=[...state.bookedRooms,action.payload]
            return state;
         }
    
});

export default bookingDetailsReducer;