import React from 'react'
import './View-more.component.scss'
import ImageSlider from './../../shared/image-slider/Image-slider.component'
class ViewMore extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <h1>Author name</h1>
        <img className='image' src='http://via.placeholder.com/350x350' />
        <ImageSlider />
      </div>
    )
  }
}

export default ViewMore
