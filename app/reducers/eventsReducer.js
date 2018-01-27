const eventsReducer = (state = {
    eventsFetched: [],
    isFetching: false,
    isInvalid: false
}, action) => {
    switch (action.type) {
        case "RECEIVE_EVENTS":
            state = {
                ...state,
                eventsFetched: [...state.eventsFetched, action.payload],
                isFetching: false,
                isInvalid: false
            }
            break
        case "REQUEST_EVENTS":
            state = {
                ...state,
                isFetching: true,
                isInvalid: false
            }
            break
        case "INVALID_EVENTS":
            state = {
                ...state,
                isFetching: false,
                isInvalid: true
            }
            break
    }
    return state
}


export default eventsReducer
