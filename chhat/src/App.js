import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Chat from './component/chat/Chat'
import Join from './component/join/Join'
const App = () => {
    return (
        <Router>
            <Route exact path = "/" component = {Join} />
            <Route exact path = "/chat" component = {Chat} /> }
        </Router>
    )
}

export default App
