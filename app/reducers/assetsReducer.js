const assetsReducer = (state = {
    assetsFetched: [],
    isFetching: false,
    isInvalid: false
}, action) => {
    switch (action.type) {
        case "RECEIVE_ASSETS":
            state = {
                ...state,
                assetsFetched: [...state.assetsFetched, action.payload],
                isFetching: false,
                isInvalid: false
            }
            break
        case "REQUEST_ASSETS":
            state = {
                ...state,
                isFetching: true,
                isInvalid: false
            }
            break
        case "INVALID_ASSETS":
            state = {
                ...state,
                isFetching: false,
                isInvalid: true
            }
            break
    }
    return state
}

export default assetsReducer

