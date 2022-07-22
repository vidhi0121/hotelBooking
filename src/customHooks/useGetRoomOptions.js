import { useSelector } from "react-redux"

export const useGetRoomOptions = () => {
    const roomOptions = useSelector((state) => state.totalRooms)
    return roomOptions
}