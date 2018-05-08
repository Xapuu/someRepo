import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import  Header  from './components/header/Header.component'
import Main from './components/main/Main.component'

class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Main /> 
      </div>
    )
  }
}

export default App
