const api = {
  Login: '/auth/oauth/token',
  Logout: '/auth/token/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/admin/user/info'
}
export default api
