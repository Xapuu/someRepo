// TODO create some build logic for changing the root path
export const ROUTING_CONSTANTS = {
  APP_ROOT_PATH: 'http://localhost:8080',
  REGISTER: 'register',
  LOGIN: 'login',
  AUTORIZATION: 'auth'
}

export const pathManager = pathArr =>
  [ROUTING_CONSTANTS.APP_ROOT_PATH, ...pathArr].join('/')
