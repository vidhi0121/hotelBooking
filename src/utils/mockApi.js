export const mockedGetApi = (a) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(a), 1000)
    });
}

export const postMockData = (dataType, data, dispatch) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            dispatch({ type: dataType, payload: data });
            resolve({
                statusCode: 200,
                successMsg: 'Booking Done Successfully'
            })
        }, 3000)
    })
}