import React from 'react'
import './Image-slider.component.scss'
import left from './../../../../left.svg'
import right from './../../../../right.svg'

class ImageSlider extends React.Component {
  constructor (props) {
    super(props)
  }

  scrollRight () {
    document
      .getElementsByClassName('view-more-image-selector-wrap')[0]
      .scrollBy(100, 0)
  }

  scrollLeft () {
    document
      .getElementsByClassName('view-more-image-selector-wrap')[0]
      .scrollBy(-100, 0)
  }

  render () {
    return (
      <div>
        <div className='view-more-box'>
          <img
            onClick={this.scrollLeft}
            className='image-slider-arrow'
            src={left}
            alt='fireSpot'
          />
          <div className='view-more-image-selector-wrap'>
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/360x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x700'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
            <img
              className='image'
              src='http://via.placeholder.com/350x350'
              alt='someImg'
            />
          </div>
          <img
            onClick={this.scrollRight}
            className='image-slider-arrow'
            src={right}
            alt='fireSpot'
          />
        </div>
      </div>
    )
  }
}

export default ImageSlider
