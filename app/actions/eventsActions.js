import 'whatwg-fetch'
import api from './../../api.js'

function receiveEvents(events){
    return {
        type: 'RECEIVE_EVENTS',
        payload: events
    }
}

function requestEvents(){
    return {
        type: 'REQUEST_EVENTS'
    }
}

function invalidEvents(){
    return {
        type: 'INVALID_EVENTS'
    }
}

export function fetchEvents(latitude,longitude,radius,date){
    return dispatch => {
        
        dispatch(requestEvents())

        var obj = {
            method: 'GET',
            headers: api.headers
        }
        
        var queryparams = `?location=${latitude},${longitude}&radius=${radius}&date=${date}` 

        fetch(`${api.events.url}${queryparams}`, obj)
            .then(res => res.json())
            .then(json => {
                dispatch(receiveEvents(json.data))
            })
            .catch(err => {
                console.log(err)
                //                dispatch(invalidEvents()) 
            })
    } 
}

