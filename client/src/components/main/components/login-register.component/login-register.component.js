import React, { Component } from 'react'
import './login-register.component.scss'

class LoginRegister extends Component {
  constructor (props) {
    super(props)

    this.state = {
      loginRegisterToggle: true
    }
  }

  handleInput = data => {
    const key = data.target.placeholder
    const value = data.target.value
    this.setState(state => ({ ...state, [key]: value }))
  }

  loginRegisterToggle = () => {
    console.log(this.props)
    this.setState(state => ({
      ...state,
      loginRegisterToggle: !state.loginRegisterToggle
    }))
  }

  submitForm = e => d => {
    // TODO extend the logic so only the submited form data is passed
    e.preventDefault()
    this.props.componentEvent({
      actionType: d,
      data: this.state
    })
  }

  render () {
    const loginRegisterDisplay = this.state.loginRegisterToggle
    return (
      <div>
        <button onClick={() => this.loginRegisterToggle('login')}>
          Toggle Login Register
        </button>
        {loginRegisterDisplay
          ? <form onSubmit={e => this.submitForm(e)('login')}>
            <h1>Login</h1>
            <label>
                Username:
                <input
                  placeholder='username'
                  onChange={e => this.handleInput(e)}
                />
            </label>
            <label>
                Password:
                <input
                  placeholder='password'
                  onChange={e => this.handleInput(e)}
                />
            </label>
            <button type='submit'>Login</button>
          </form>
          : <form onSubmit={e => this.submitForm(e)('register')}>
            <h1>Register</h1>
            <label>
              {' '}
                Username:
                <input
                  placeholder='username'
                  onChange={e => this.handleInput(e)}
                />
            </label>
            <label>
                Password:
                <input
                  placeholder='password'
                  onChange={e => this.handleInput(e)}
                />
            </label>
            <label>
                Confirm Password
                <input
                  placeholder='confirmPassword'
                  onChange={e => this.handleInput(e)}
                />
            </label>
            <button type='submit'>Login</button>
          </form>}
      </div>
    )
  }
}

export default LoginRegister
