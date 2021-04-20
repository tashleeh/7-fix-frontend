import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'

@connect(({ ServiceProviders, loading }) => ({ ServiceProviders, loading }))
@connect(({ services }) => ({ services }))
@connect(({ zone }) => ({ zone }))
class Provider extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'services/list',
      payload: {},
    })
    dispatch({
      type: 'zone/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    const { type, dispatch } = this.props
    let formData = new FormData()
    const {
      fullNameAr,
      fullNameEn,
      phoneNumber,
      email,
      password,
      nationality,
      naId,
      city,
      neighborhood,
      streetName,
      companyName,
      CR,
      services,
      zone,
    } = values
    formData.append('image', this.state.image.file.originFileObj)
    formData.append('fullNameAr', fullNameAr)
    formData.append('fullNameEn', fullNameEn)
    formData.append('phoneNumber', phoneNumber)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('nationality', nationality)
    formData.append('naId', naId)
    formData.append('city', city)
    formData.append('neighborhood', neighborhood)
    formData.append('streetName', streetName)
    formData.append('companyName', companyName)
    formData.append('services', services)
    formData.append('zone', zone)
    formData.append('CR', CR)
    formData.append('type', type)

    // const currentValue = departments.list.filter((elm) => {
    //   if (values.department == elm.nameEn) return elm._id
    // })
    // formData.append(
    //   'department',
    //   currentValue[0] ? currentValue[0]._id : values.department
    // )

    await dispatch({
      type: 'ServiceProviders/create',
      payload: formData,
    })
  }
  render() {
    const { services, zone, loading, data } = this.props
    return (
      <Page inner>
        <Spin spinning={loading?.global}>
          <Row justify="center">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              style={{ width: '100%' }}
            >
              <Col span={22}>
                <Row gutter={40}>
                  <Col lg={12} md={12} xs={24} sm={24}>
                    <Form.Item name="image">
                      <Avatar
                        image={data?.image}
                        getImage={(image) => this.setState({ image })}
                      />
                    </Form.Item>
                    <span>full Name Ar</span>
                    <Form.Item
                      name="fullNameAr"
                      initialValue={data?.fullNameAr}
                      rules={[
                        { required: true, message: 'Please enter Ar. name' },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <span>full Name En</span>
                    <Form.Item
                      name="fullNameEn"
                      initialValue={data?.fullNameEn}
                      rules={[
                        { required: true, message: 'Please enter En. name' },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <span>Phone Number</span>
                    <Form.Item
                      name="phoneNumber"
                      initialValue={data?.phoneNumber}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the phone Number',
                        },
                      ]}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <span>Email</span>
                    <Form.Item
                      name="email"
                      initialValue={data?.email}
                      rules={[
                        { required: true, message: 'Please enter your Email' },
                      ]}
                    >
                      <Input type="email" />
                    </Form.Item>
                    <span>Password</span>
                    <Form.Item
                      name="password"
                      initialValue={data?.password}
                      rules={[
                        { required: true, message: 'Please enter password' },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <span>Nationality</span>
                    <Form.Item
                      name="nationality"
                      initialValue={data?.nationality}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter the nationality',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <span>City</span>
                    <Form.Item
                      name="city"
                      initialValue={data?.city}
                      rules={[
                        { required: true, message: 'Please enter the city' },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} xs={24} sm={24}>
                    <span>Neighborhood</span>
                    <Form.Item
                      name="neighborhood"
                      initialValue={data?.neighborhood}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter neighborhood',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <span>Street Name</span>
                    <Form.Item
                      name="streetName"
                      initialValue={data?.streetName}
                      rules={[
                        { required: true, message: 'Please enter street Name' },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <span>Company Name</span>
                    <Form.Item
                      name="companyName"
                      initialValue={data?.companyName}
                      rules={[
                        {
                          required: true,
                          message: 'Please enter company Name',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <span>CR</span>
                    <Form.Item
                      name="CR"
                      initialValue={data?.CR}
                      rules={[{ required: true, message: 'Please enter CR' }]}
                    >
                      <Input />
                    </Form.Item>

                    <span>NaId</span>
                    <Form.Item
                      name="naId"
                      initialValue={data?.naId}
                      rules={[{ required: true, message: 'Please enter naId' }]}
                    >
                      <Input />
                    </Form.Item>

                    <span>Services</span>
                    <Form.Item
                      name="services"
                      initialValue={data?.services?.nameEn}
                      rules={[
                        { required: true, message: 'Please select a services' },
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
                    <span>Zone</span>
                    <Form.Item
                      name="zone"
                      initialValue={data?.zone?.nameEn}
                      rules={[
                        { required: true, message: 'Please select a services' },
                      ]}
                    >
                      <Select>
                        {zone?.list?.map((elm, index) => {
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
                  </Col>
                </Row>
              </Col>
            </Form>
          </Row>
        </Spin>
      </Page>
    )
  }
}

Provider.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Provider
