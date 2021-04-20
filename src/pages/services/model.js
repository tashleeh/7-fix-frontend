/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const { servicesList, createServices, deleteService, updateServices } = api

export default modelExtend(pageModel, {
  namespace: 'services',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(servicesList, payload)
      try {
        if (data.success) {
          const { services, serviceLength } = data
          yield put({
            type: 'updateState',
            payload: {
              list: services,
              total: serviceLength,
            },
          })
        } else {
          message.error(data)
        }
      } catch (error) {
        message.error(error)
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createServices, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Service Added Successfuly!')
          yield put(routerRedux.push('/services'))
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *delete({ payload }, { put, call }) {
      const data = yield call(deleteService, payload)
      try {
        if (data.success) {
          yield put({
            type: 'deleteServicesFromList',
            payload: data.data.result,
          })
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(updateServices, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Service has been updated successfully')
          window.location.reload()
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
        // let { fields } = error
        // // Object.keys(fields).map((field) => {
        // //   fields[field].status === 'error' &&
        // //     message.error({
        // //       content: <span id={field}>{fields[field].feedback.ar}</span>,
        // //       style: {
        // //         marginTop: '20vh',
        // //       },
        // //     })
        // // })
        // yield put({
        //   type: 'updateState',
        //   payload: {
        //     errorFields: Object.keys(fields).filter(
        //       (field) => fields[field].status === 'error'
        //     ),
        //   },
        // })
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
    deleteServicesFromList(state, { payload }) {
      const newState = JSON.parse(JSON.stringify(state))
      const { list } = newState
      const newList =
        list && _.isArray(list) && list.filter((row) => row._id !== payload.id)
      return {
        ...state,
        list: newList,
      }
    },
  },
})
