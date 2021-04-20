/* global window */

import { history } from 'umi'
import { stringify } from 'qs'
import store from 'store'
import { queryLayout } from 'utils'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import api from 'api'
import config from 'config'
import Axios from 'axios'
import listOfRoute from '../route'
const { pathToRegexp } = require('path-to-regexp')
const { logoutUser } = api

const goDashboard = () => {
  if (pathToRegexp(['/', '/login']).exec(window.location.pathname)) {
    history.push({
      pathname: '/services',
    })
  }
}

export default {
  namespace: 'app',
  state: {
    routeList: [
      {
        id: '1',
        icon: 'laptop',
        name: 'Dashboard',
        zhName: '仪表盘',
        router: '/dashboard',
      },
    ],
    locationPathname: '',
    locationQuery: {},
    theme: store.get('theme') || 'light',
    collapsed: store.get('collapsed') || false,
    notifications: [
      {
        title: 'New User is registered.',
        date: new Date(Date.now() - 10000000),
      },
      {
        title: 'Application has been approved.',
        date: new Date(Date.now() - 50000000),
      },
    ],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },
    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },

    setupRequestCancel({ history }) {
      history.listen(() => {
        const { cancelRequest = new Map() } = window

        cancelRequest.forEach((value, key) => {
          if (value.pathname !== window.location.pathname) {
            value.cancel(CANCEL_REQUEST_MESSAGE)
            cancelRequest.delete(key)
          }
        })
      })
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { locationPathname } = yield select((_) => _.app)
      const user = store.get('user')
      const permissions = {
        visit: [],
      }
      permissions.visit = listOfRoute.map((item) => item.id)
      if (user) {
        store.set('routeList', listOfRoute)
        store.set('permissions', permissions)
        Axios.defaults.headers.common.Authorization = `Bearer ${user.token}`
        store.set('isInit', true)
        goDashboard()
      } else if (queryLayout(config.layouts, locationPathname) !== 'public') {
        history.push({
          pathname: '/login',
          search: stringify({
            from: locationPathname,
          }),
        })
      }
    },

    *signOut({ payload }, { call, put }) {
      const data = yield call(logoutUser)
      if (data.success) {
        store.set('routeList', [])
        store.set('permissions', { visit: [] })
        store.set('user', {})
        store.set('isInit', false)
        // yield put({ type: 'query' })
        history.push({
          pathname: '/login',
        })
      } else {
        console.log('--------', data)
        throw data
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    handleThemeChange(state, { payload }) {
      store.set('theme', payload)
      state.theme = payload
    },

    handleCollapseChange(state, { payload }) {
      store.set('collapsed', payload)
      state.collapsed = payload
    },

    allNotificationsRead(state) {
      state.notifications = []
    },
  },
}
