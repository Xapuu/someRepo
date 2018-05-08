import React from 'react'
import LoginRegister
  from './../login-register.component/login-register.component'
import Profile from './../profile/profile.component'
import './Home.component.scss'
import { ROUTING_CONSTANTS, pathManager } from './../../../../common/constants'
import { xFetcher } from './../../../../common/custom-requester'
import cookie from 'react-cookies'
import { AuthContext } from './../../../../context/authContext'

class Home extends React.Component {
  constructor (props) {
    super(props)
    console.log(this.props)
  }

  loginAction = data => {
    console.log(ROUTING_CONSTANTS)
    xFetcher(
      pathManager([ROUTING_CONSTANTS.AUTORIZATION, ROUTING_CONSTANTS.LOGIN]),
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    ).then(res => {
      cookie.save('token', res.token)
    })
  }

  registerAction = data => {
    xFetcher(
      pathManager([ROUTING_CONSTANTS.AUTORIZATION, ROUTING_CONSTANTS.REGISTER]),
      {
        method: 'POST',
        body: JSON.stringify(data)
      }
    ).then(res => {
      cookie.save('token', res.token)
    })
  }

  getChildEvent = e => {
    const authActions = {
      login: this.loginAction,
      register: this.registerAction
    }
    authActions[e.actionType](e.data)
  }

  render () {
    return (
      <div>
        <h1>Login/Regiser</h1>
        <AuthContext.Consumer>
          {c => {
            return c.token
              ? <Profile />
              : <LoginRegister componentEvent={e => this.getChildEvent(e)} />
          }}
        </AuthContext.Consumer>
      </div>
    )
  }
}

export default Home
