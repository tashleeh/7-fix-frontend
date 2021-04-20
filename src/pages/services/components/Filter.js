import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from 'components'
import './list.less'
import { Trans } from '@lingui/react'
import { history, Link, withRouter } from 'umi'
import {
  Button,
  Row,
  Col,
  DatePicker,
  Form,
  Input,
  Cascader,
  Select,
} from 'antd'
import '../../../layouts/BaseLayout.less'
import _ from 'lodash'
const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends Component {
  formRef = React.createRef()

  handleFields = (fields) => {
    const { createTime } = fields
    if (createTime && createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange } = this.props
    const values = this.formRef.current.getFieldsValue()
    const fields = this.handleFields(values)
    onFilterChange(fields)
  }

  handleReset = () => {
    const fields = this.formRef.current.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.formRef.current.setFieldsValue(fields)
    this.handleSubmit()
  }
  render() {
    const { onAdd, filter, i18n } = this.props
    // const { name, address } = filter

    return (
      <div className={'searchAndFilter'}>
        <Form ref={this.formRef} name="control-ref">
          <Row gutter={24} type={'flex'} justify={'start'}>
            <Col xs={24} md={24} lg={24}>
              <Row
                type="flex"
                align="middle"
                justify="space-between"
                gutter={12}
                className={'filterBtns'}
              >
                <Col xs={0} md={0} lg={21}></Col>
                <Col xs={24} md={12} lg={3}>
                  <div className="mt10">
                    <Button
                      type="ghost"
                      className="add-button"
                      onClick={() =>
                        history.push({
                          pathname: '/services/create',
                        })
                      }
                    >
                      <Trans> + Add Services</Trans>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
