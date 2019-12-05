import Vue from 'vue'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/store/mutation-types'
import { welcome, encryption } from '@/utils/util'

const user = {
  state: {
    token: '',
    refreshToken: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_Refresh_Token: (state, refreshToken) => {
      state.refreshToken = refreshToken
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const user = encryption({
        data: userInfo,
        key: 'gdscloudprisbest',
        param: ['password']
      })
      return new Promise((resolve, reject) => {
        login(user).then(response => {
          // debugger
          const accessToken = response.access_token
          const refreshToken = response.refresh_token
          Vue.ls.set(ACCESS_TOKEN, accessToken, 7 * 24 * 60 * 60 * 1000)
          Vue.ls.set(REFRESH_TOKEN, refreshToken, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', accessToken)
          commit('SET_Refresh_Token', refreshToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response.data
          const { sysUser, roles, permissions } = result
          if (roles.length > 0 && permissions.length > 0) {
            // const role = result.role
            // role.permissions = result.role.permissions
            // role.permissions.map(per => {
            //   if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
            //     const action = per.actionEntitySet.map(action => { return action.action })
            //     per.actionList = action
            //   }
            // })
            // role.permissionList = role.permissions.map(permission => { return permission.permissionId })
            commit('SET_ROLES', roles)
            commit('SET_PERMISSIONS', permissions)
            commit('SET_INFO', sysUser)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: sysUser.realName, welcome: welcome() })
          commit('SET_AVATAR', sysUser.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout().then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
