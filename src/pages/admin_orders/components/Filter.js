import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../services/components/list.less'
import { Button, Row, Col, Form, Select } from 'antd'
import '../../../layouts/BaseLayout.less'
import _ from 'lodash'
import { connect } from 'umi'

@connect(({ loading, adminOrders }) => ({
  loading,
  adminOrders,
}))
class Filter extends Component {
  render() {
    return (
      <div className={'searchAndFilter'}>
        <Form
          onFinish={(values) => {
            const { dispatch } = this.props
            dispatch({
              type: 'adminOrders/list',
              payload: { type: values.type, orderType: values.orderType },
            })
          }}
          name="control-ref"
        >
          <Row gutter={24} type={'flex'} justify={'start'}>
            <Col xs={24} md={24} lg={24}>
              <Row
                type="flex"
                align="middle"
                justify="start"
                gutter={12}
                className={'filterBtns'}
              >
                <Col xs={24} md={6} lg={6}>
                  <Form.Item name="type">
                    <Select style={{ width: '100%' }} placeholder="Type">
                      <Select.Option value="waiting">Waiting</Select.Option>
                      <Select.Option value="accepted">Accepted</Select.Option>
                      <Select.Option value="rejected">Rejected</Select.Option>
                      <Select.Option value="inProgress">
                        in Progress
                      </Select.Option>
                      <Select.Option value="closed">Closed</Select.Option>
                      <Select.Option value="canceled">canceled</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={6} lg={6}>
                  <Form.Item name="orderType">
                    <Select style={{ width: '100%' }} placeholder="Order Type">
                      <Select.Option value="internal">Internal</Select.Option>
                      <Select.Option value="external">External</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={6} lg={6}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Search
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
        <br />
        <br />
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
