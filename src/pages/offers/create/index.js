import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin, DatePicker } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'
import './index.less'
import moment from 'moment'

@connect(({ offers, loading }) => ({ offers, loading }))
@connect(({ categories }) => ({ categories }))
class CreateOffer extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categories/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    const { dispatch, data, categories } = this.props
    let formData = new FormData()
    const {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      category,
      startDate,
      endDate,
      discount,
    } = values
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
    formData.append('nameAr', nameAr)
    formData.append('nameEn', nameEn)
    formData.append('descriptionAr', descriptionAr)
    formData.append('descriptionEn', descriptionEn)
    formData.append('startDate', startDate)
    formData.append('endDate', endDate)
    formData.append('discount', discount)

    const currentValue = categories.list.filter((elm) => {
      if (category == elm.nameEn) return elm._id
    })
    formData.append(
      'category',
      currentValue[0] ? currentValue[0]._id : category
    )
    if (data) {
      formData.append('id', data._id)
      await dispatch({
        type: 'offers/update',
        payload: formData,
      })
    } else {
      await this.props.dispatch({
        type: 'offers/create',
        payload: formData,
      })
    }
  }
  render() {
    const { categories, loading, data } = this.props
    console.log('data', data)
    return (
      <div>
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

                      <span>Description Ar</span>
                      <Form.Item
                        name="descriptionAr"
                        initialValue={data?.descriptionAr}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter Ar. description',
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <span>Description En</span>
                      <Form.Item
                        name="descriptionEn"
                        initialValue={data?.descriptionEn}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter En. description',
                          },
                        ]}
                      >
                        <Input.TextArea />
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} xs={24} sm={24}>
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
                      <span>Category</span>
                      <Form.Item
                        name="category"
                        initialValue={data?.category?.map((elm) => elm.nameEn)}
                        rules={[
                          { required: true, message: 'Please select category' },
                        ]}
                      >
                        <Select mode="multiple">
                          {categories?.list?.map((elm, index) => {
                            return (
                              <Select.Option key={index} value={elm._id}>
                                {elm.nameEn}
                              </Select.Option>
                            )
                          })}
                        </Select>
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
                    </Col>
                  </Row>
                </Col>
              </Form>
            </Row>
          </Spin>
        </Page>
      </div>
    )
  }
}

CreateOffer.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateOffer
