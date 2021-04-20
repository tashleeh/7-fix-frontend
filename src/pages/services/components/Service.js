import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Avatar } from './upload'
import './list.less'

@connect(({ services, loading }) => ({ services, loading }))
class Service extends Component {
  onFinish = async (values) => {
    const { dispatch, data } = this.props
    let formData = new FormData()

    const file = {
      uid: new Date(),
      name: 'image.png',
      status: 'done',
      url: data?.image,
    }

    formData.append(
      'image',
      this.state.image.file ? this.state.image.file.originFileObj : file
    )
    formData.append('nameAr', values.nameAr)
    formData.append('nameEn', values.nameEn)
    if (data) {
      formData.append('id', data._id)
      await dispatch({
        type: 'services/update',
        payload: formData,
      })
    } else {
      // formData.append('image', this.state.image.file.originFileObj)
      await dispatch({
        type: 'services/create',
        payload: formData,
      })
    }
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    const { loading, data } = this.props
    return (
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
                <Form.Item name="image">
                  <Avatar
                    image={data?.image}
                    getImage={(image) => this.setState({ image })}
                  />
                </Form.Item>
                <span>Name Ar</span>
                <Form.Item
                  name="nameAr"
                  initialValue={data?.nameAr}
                  rules={[{ required: true, message: 'Please enter Ar. name' }]}
                >
                  <Input />
                </Form.Item>
                <span>Name En</span>
                <Form.Item
                  name="nameEn"
                  initialValue={data?.nameEn}
                  rules={[{ required: true, message: 'Please enter En. name' }]}
                >
                  <Input />
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
    )
  }
}

Service.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Service
