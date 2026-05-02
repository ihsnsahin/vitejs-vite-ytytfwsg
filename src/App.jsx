import { useState } from 'react'
import './App.css'
import Login from './components/Register.jsx'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Success from './components/Success'

function App() {

  return (
    <>
     
     <Switch>
       <Route path="/" exact>
       <Login/>
      </Route>
      <Route path="/success">
        <Success/>
        </Route>
      </Switch>
    </>
  )
}

export default App
