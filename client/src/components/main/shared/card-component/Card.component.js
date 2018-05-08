import React from 'react'
import './Card.component.scss'
import { Link } from 'react-router-dom'

const Card = () => (
  <div className='card-wrap-element'>
    <h1>Sculpture name</h1>
    <img className='card-image' src='http://via.placeholder.com/350x350' />
    <div className='card-action-row'>
      <div className='card-button-wrapper'>
        <button href='#' className='card-buy-button'>Купи</button>

        {/* Whenever the card item is sold out
        <button href='#' className='card-sold-button'>Продадена</button> */}
        <Link className='option' to='/viewMore'>
          <button className='card-view-more'>
            Разгледай
          </button>
        </Link>

      </div>
      <div className='card-price'>200 bgn</div>
    </div>
  </div>
)

export default Card
