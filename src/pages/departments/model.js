/* global window */

import modelExtend from 'dva-model-extend'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import { delay } from 'redux-saga'
import _ from 'lodash'

const {
  departmentsList,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = api

export default modelExtend(pageModel, {
  namespace: 'departments',

  state: {
    list: [],
    total: 0,
    npPages: 0,
    pageSize: 25,
  },
  effects: {
    *list({ payload }, { put, call }) {
      const data = yield call(departmentsList, payload)
      if (data.success) {
        const { departments, departmentLength } = data
        yield put({
          type: 'updateState',
          payload: {
            list: departments,
            total: departmentLength,
          },
        })
      } else {
        throw data
      }
    },
    *create({ payload }, { put, call }) {
      try {
        const data = yield call(createDepartment, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Department Added Successfuly!')
          yield put(routerRedux.push('/departments'))
        } else {
          message.error(data)
        }
      } catch (error) {
        console.log(error)
      }
    },
    *update({ payload }, { put, call }) {
      try {
        const data = yield call(updateDepartment, payload)
        if (data.success) {
          yield delay(6000)
          message.success('Department has been updated successfully')
          window.location.reload()
        } else {
          throw data
        }
      } catch (error) {
        message.error(error)
        // let { fields } = error
        // Object.keys(fields).map((field) => {
        //   fields[field].status === 'error' &&
        //     message.error({
        //       content: <span id={field}>{fields[field].feedback.ar}</span>,
        //       style: {
        //         marginTop: '20vh',
        //       },
        //     })
        // })
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
    *delete({ payload }, { put, call }) {
      const data = yield call(deleteDepartment, payload)
      if (data.success) {
        yield put({
          type: 'deleteFromList',
          payload: data.data.result,
        })
      } else {
        message.error(data)
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
  },
})
