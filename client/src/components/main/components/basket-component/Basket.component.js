import React from 'react'
import Card from './../../shared/card-component/Card.component'
import './Basket.component.scss'

const Basket = () => (
  <div>
    <h1>Basket</h1>
    <div className='cards-wrap'>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
      <div className='card-wrap'>
        <Card />
      </div>
    </div>
  </div>
)

export default Basket
