import "whatwg-fetch";
import api from "./../../api.js";

function receiveAssets(assets) {
  return {
    type: "RECEIVE_ASSETS",
    payload: assets
  };
}

function requestAssets() {
  return {
    type: "REQUEST_ASSETS"
  };
}

function invalidAssets() {
  return {
    type: "INVALID_ASSETS"
  };
}

export function fetchAssets() {
  return dispatch => {
    dispatch(requestAssets());

    var obj = {
      method: "GET",
      headers: api.headers
    };

    fetch(api.assets.url, obj)
      .then(res => res.json())
      .then(json => {
        dispatch(receiveAssets(json.data.assets));
      })
      .catch(err => {
        console.log(err);
        dispatch(invalidAssets());
      });
  };
}
