import api from './index'
import { axios } from '@/utils/request'

const scope = 'server'
/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (user) {
  const grantType = 'password'
  return axios({
    url: api.Login,
    method: 'post',
    headers: {
      isToken: false,
      TENANT_ID: '1',
      Authorization: 'Basic Z2RzOmdkcw=='
    },
    params: {
      ...user,
      grant_type: grantType,
      scope
    }
  })
}

export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo () {
  return axios({
    url: api.UserInfo,
    method: 'get'
  })
}

export function getCurrentUserNav () {
  return axios({
    url: api.Menu,
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: api.Logout,
    method: 'delete'
  })
}

/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
