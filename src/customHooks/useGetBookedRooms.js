import { useSelector } from "react-redux";
export const useGetBookedRooms = () => {
    const bookedRooms = useSelector((state) => state.bookedRooms)
    return bookedRooms
}