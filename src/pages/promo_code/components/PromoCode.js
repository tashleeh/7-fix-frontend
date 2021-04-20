import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Spin, DatePicker } from 'antd'
import { Page } from 'components'
import moment from 'moment'

@connect(({ promoCode, loading }) => ({ promoCode, loading }))
class Category extends Component {
  onFinish = async (values) => {
    const { dispatch, data } = this.props
    const { nameAr, nameEn, startDate, endDate, discount } = values
    if (data) {
      await dispatch({
        type: 'promoCode/update',
        payload: { nameAr, nameEn, startDate, endDate, discount, id: data._id },
      })
    } else {
      await dispatch({
        type: 'promoCode/create',
        payload: { nameAr, nameEn, startDate, endDate, discount },
      })
    }
  }
  render() {
    const { loading, data } = this.props
    return (
      <div>
        <Page inner>
          <Spin spinning={loading?.global}>
            <Row justify="center">
              <Col lg={12} md={12} xs={24} sm={24}>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  <span>Name Ar</span>
                  <Form.Item
                    name="nameAr"
                    initialValue={data?.nameAr}
                    rules={[
                      { required: true, message: 'Please enter Ar. name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <span>Name En</span>
                  <Form.Item
                    name="nameEn"
                    initialValue={data?.nameEn}
                    rules={[
                      { required: true, message: 'Please enter En. name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <span>Start Date</span>
                  <Form.Item
                    name="startDate"
                    initialValue={moment(data?.startDate)}
                    rules={[
                      {
                        required: true,
                        message: 'Please pick a date',
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <span>End Date</span>
                  <Form.Item
                    name="endDate"
                    initialValue={moment(data?.endDate)}
                    rules={[
                      {
                        required: true,
                        message: 'Please pick a date',
                      },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                  <span>Discount</span>
                  <Form.Item
                    name="discount"
                    initialValue={data?.discount}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter discount',
                      },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Spin>
        </Page>
      </div>
    )
  }
}

Category.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Category
