const viewReducer = (state = {
    main: true
}, action) => {
    switch (action.type) {
        case "REQUEST_MAIN_VIEW":
            state = {
                ...state,
                main: true
            }
            break
        case "REQUEST_EVENT_VIEW":
            state = {
                ...state,
                main: false
            }
            break
    }
    return state
}

export default viewReducer
