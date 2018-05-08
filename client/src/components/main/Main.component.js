import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './components/home-component/Home.component'
import Shop from './components/shop-component/Shop.component'
import Contact from './components/contact-component/Contact.component'
import Basket from './components/basket-component/Basket.component'
import ViewMore from './components/view-more/View-more.component'
import { AuthContext } from './../../context/authContext'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/shop' component={Shop} />
      <Route path='/contact' component={Contact} />
      <Route path='/basket' component={Basket} />
      <Route path='/viewMore' component={ViewMore} />
    </Switch>
  </main>
)

export default Main
