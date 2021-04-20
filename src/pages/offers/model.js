/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { offersList, createOffer, deleteOffer, updateOffer } = api

export default modelExtend(pageModel, {
  namespace: 'offers',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(offersList, payload)
      try {
        if (data.success) {
          const { offers, offersLength } = data
          yield put({
            type: 'updateState',
            payload: {
              list: offers,
              total: offersLength,
            },
          })
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *delete({ payload }, { put, call }) {
      try {
        const data = yield call(deleteOffer, payload)
        if (data.success) {
          yield put({
            type: 'deleteFromList',
            payload: data.data.result,
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
        const data = yield call(createOffer, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Offer has been added successfuly!')
          yield put(routerRedux.push('/offers'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(updateOffer, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Offer has been updated successfully')
          window.location.reload()
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
