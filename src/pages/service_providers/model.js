import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { providersList, createProvider, approveProvider } = api

export default modelExtend(pageModel, {
  namespace: 'ServiceProviders',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(providersList, payload)
      try {
        if (data.success) {
          const { result } = data
          yield put({
            type: 'updateState',
            payload: {
              list: result,
            },
          })
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },

    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createProvider, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Provider has been Added Successfuly!')
          yield put(routerRedux.push('/service_providers'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *update({ payload }, { put, call }) {
      const data = yield call(approveProvider, payload)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: data.data.result,
        })
        window.location.reload()
      } else {
        message.error(data)
      }
    },
  },
  reducers: {
    deleteFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { list } = newState
      const newList =
        list && _.isArray(list) && list.filter((row) => row._id !== payload.id)
      return {
        ...state,
        list: newList,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
