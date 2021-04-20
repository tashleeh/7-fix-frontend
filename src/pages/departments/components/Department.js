import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'

@connect(({ departments, loading }) => ({ departments, loading }))
@connect(({ services }) => ({ services }))
class Department extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'services/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    let formData = new FormData()
    const { dispatch, data, services } = this.props
    const file = {
      uid: '-1',
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
    formData.append('type','all')
    const currentValue = services.list.filter((elm) => {
      if (values.service == elm.nameEn) return elm._id
    })
    formData.append(
      'service',
      currentValue[0] ? currentValue[0]._id : values.service
    )
    if (data) {
      formData.append('id', data._id)
      await dispatch({
        type: 'departments/update',
        payload: formData,
      })
    } else {
      await dispatch({
        type: 'departments/create',
        payload: formData,
      })
    }
  }

  render() {
    const { services, loading, data } = this.props
    return (
      <div>
        <Page inner>
          <Spin spinning={loading?.models?.services}>
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

                  <span>Type</span>
                  {/* <Form.Item
                    name="type"
                    initialValue={data?.type}
                    rules={[{ required: true, message: 'Please enter type' }]}
                  >
                    <Select>
                      <Select.Option value="personal">Personal</Select.Option>
                      <Select.Option value="commercial">
                        Commercial
                      </Select.Option>
                      <Select.Option value="all">All</Select.Option>
                    </Select>
                  </Form.Item> */}
                  <span>Service</span>
                  <Form.Item
                    name="service"
                    initialValue={data?.service?.nameEn}
                    rules={[
                      { required: true, message: 'Please select service' },
                    ]}
                  >
                    <Select>
                      {services?.list?.map((elm, index) => {
                        return (
                          <Select.Option key={index} value={elm._id}>
                            {elm.nameEn}
                          </Select.Option>
                        )
                      })}
                    </Select>
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

Department.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Department
