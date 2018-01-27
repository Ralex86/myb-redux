const userReducer = (state = {
    me: [],
    isFetching: false,
    isInvalid: false
}, action) => {
    switch (action.type) {
        case "RECEIVE_USER":
            state = {
                ...state,
                me: [...state.me, action.payload],
                isFetching: false,
                isInvalid: false
            }
            break
        case "REQUEST_USER":
            state = {
                ...state,
                isFetching: true,
                isInvalid: false
            }
            break
        case "INVALID_USER":
            state = {
                ...state,
                isInvalid: true,
                isFetching: false
            }
            break
    }
    return state
}

export default userReducer
