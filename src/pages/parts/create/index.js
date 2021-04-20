import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'
import './index.less'

@connect(({ parts, loading }) => ({ parts, loading }))
@connect(({ categories }) => ({ categories }))
class CreatePart extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'categories/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    const {
      nameAr,
      nameEn,
      descriptionAr,
      descriptionEn,
      category,
      madeIn,
      SpecificationAr,
      SpecificationEn,
      price,
      size,
    } = values
    let formData = new FormData()
    const { dispatch, data, categories } = this.props

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
    console.log('categories', categories)
    formData.append('nameAr', nameAr)
    formData.append('nameEn', nameEn)
    formData.append('price', price)
    formData.append('descriptionAr', descriptionAr)
    formData.append('descriptionEn', descriptionEn)
    formData.append('madeIn', madeIn)
    formData.append('SpecificationEn', SpecificationEn)
    formData.append('SpecificationAr', SpecificationAr)
    formData.append('size', size)

    const currentValue = categories.list.filter((elm) => {
      if (values.category == elm.nameEn) return elm._id
    })
    formData.append(
      'category',
      currentValue[0] ? currentValue[0]._id : values.category
    )
    if (data) {
      formData.append('id', data._id)
      await dispatch({
        type: 'parts/update',
        payload: formData,
      })
    } else {
      await dispatch({
        type: 'parts/create',
        payload: formData,
      })
    }
  }
  render() {
    const { categories, loading, data } = this.props
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
                      <span>Category</span>
                      <Form.Item
                        name="category"
                        initialValue={data?.category?.nameEn}
                        rules={[
                          { required: true, message: 'Please select category' },
                        ]}
                      >
                        <Select>
                          {categories?.list?.map((elm, index) => {
                            return (
                              <Select.Option key={index} value={elm._id}>
                                {elm.nameEn}
                              </Select.Option>
                            )
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col lg={12} md={12} xs={24} sm={24}>
                      <span>Made In</span>
                      <Form.Item
                        name="madeIn"
                        initialValue={data?.madeIn}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter made In',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <span>Specification En</span>
                      <Form.Item
                        name="SpecificationEn"
                        initialValue={data?.SpecificationEn}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the En. specification',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <span>Specification Ar</span>
                      <Form.Item
                        name="SpecificationAr"
                        initialValue={data?.SpecificationAr}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the Ar. specification',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <span>Price</span>
                      <Form.Item
                        name="price"
                        initialValue={data?.price}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the price',
                          },
                        ]}
                      >
                        <Input type="number" />
                      </Form.Item>
                      <span>Size</span>
                      <Form.Item
                        name="size"
                        initialValue={data?.size}
                        rules={[
                          {
                            required: true,
                            message: 'Please enter the size',
                          },
                        ]}
                      >
                        <Input />
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

CreatePart.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreatePart
