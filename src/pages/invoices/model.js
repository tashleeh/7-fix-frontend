import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { invoicesList } = api

export default modelExtend(pageModel, {
  namespace: 'invoices',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      try {
        const data = yield call(invoicesList, payload)
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
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
})
