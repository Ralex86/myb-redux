import 'whatwg-fetch'
import api from './../api.js'

function receiveUser(infos){
    return {
        type: 'RECEIVE_USER',
        payload: infos
    }
}

function requestUser(){
    return {
        type: 'REQUEST_USER'
    }    
}

function invalidUser(){
    return {
        type: 'INVALID_USER'
    }    
}

export function fetchUser(){
    return dispatch => {

        dispatch(requestUser())

        var obj = {
            method: 'GET',
            headers: api.headers
        }

        fetch(api.user.url, obj)
            .then(res => res.json())
            .then(json => {
                dispatch(receiveUser(json.data))
            })
            .catch(err => {
                console.log(err)   
                dispatch(invalidUser())
            })

    } 
}

