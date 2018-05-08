import React from 'react'
import Card from './../../shared/card-component/Card.component'
import './Shop.component.scss'

const Shop = () => (
  <div>
    <h1>Магазин</h1>
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

export default Shop
