import React from 'react'
import { Link } from 'react-router-dom'
import classes from './Header.component.scss'
import logo from './../../logo-ivan.png'
import kebap from './../../kebap.svg'
import cookie from 'react-cookies'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  openCloseMenu = e => {
    e.preventDefault()
    this.setState({ open: !this.state.open })
  }

  render () {
    return (
      <header>
        <nav className='wrap'>
          <img className='logo' src={logo} alt='fireSpot' />
          <div onClick={this.openCloseMenu} className='dropdown'>
            <div className='icon-wrap'>
              <img className='menu-icon' src={kebap} alt='fireSpot' />
            </div>
            <div
              className={'options-wrap ' + (this.state.open ? 'open' : 'close')}
            >

              <Link className='option' to='/'>Home</Link>
              <Link className='option' to='/shop'>Shop</Link>
              <Link className='option' to='/contact'>Contact</Link>
              <Link className='option' to='/basket'>Basket</Link>

              {/* TODO create refresh logic for login and logout */}
              <div className='option' onClick={() => cookie.remove('token')}>
                Logout
              </div>
            </div>
          </div>
        </nav>
      </header>
    )
  }
}

export default Header
