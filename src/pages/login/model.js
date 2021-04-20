import { history } from 'umi'

const { pathToRegexp } = require('path-to-regexp')
import api from 'api'
import { message } from 'antd'
import store from 'store'

const { loginUser } = api
import axios from 'axios'

export default {
  namespace: 'login',

  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen(location => {
  //       if (pathToRegexp('/login').exec(location.pathname)) {
  //       }
  //     })
  //   },
  // },
  // },
  effects: {
    *login({ payload }, { put, call, select }) {
      try {
        const data = yield call(loginUser, payload)
        const { locationQuery } = yield select((_) => _.app)
        if (data.success) {
          const { from } = locationQuery
          console.log('data', data)
          axios.defaults.headers.common.Authorization = `Bearer ${data.token}`
          store.set('user', data)
          yield put({ type: 'app/query' })
          if (!pathToRegexp('/login').exec(from)) {
            if (['', '/'].includes(from)) {
              history.push('/services')
            } else {
              history.push(from)
            }
          } else {
            history.push('/services')
          }
        } else {
          console.log('data : ', data)
          throw data
        }
      } catch (error) {
        console.log('error : ', error.message)
        message.error(error.message)
      }
    },
  },
}
