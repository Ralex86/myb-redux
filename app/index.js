// everything related to react
import React from 'react'
import { render } from 'react-dom'

// everything related to redux
import { Provider } from 'react-redux'

// local assets for react
import App from './containers/App'
import store from './store'

render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    window.document.getElementById('app')
)
