import React from 'react'
import cookie from 'react-cookies'

const token = cookie.load('token')
export const credentials = {
  token: false,
  updateCredentials: () => {
    if (cookie.load('token')) {
      this.token = cookie.load('token')
    }
    console.log(this.token, 'updating token')
  }
}

if (token) {
  credentials.token = token
}

export const AuthContext = React.createContext(credentials)
