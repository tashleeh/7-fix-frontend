import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import { Avatar } from '../../services/components/upload'

@connect(({ categories, loading }) => ({ categories, loading }))
@connect(({ departments }) => ({ departments }))
class Category extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'departments/list',
      payload: {},
    })
  }
  onFinish = async (values) => {
    const { departments, dispatch, data } = this.props
    let formData = new FormData()

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
    formData.append('price', values.price)
    const currentValue = departments.list.filter((elm) => {
      if (values.department == elm.nameEn) return elm._id
    })
    formData.append(
      'department',
      currentValue[0] ? currentValue[0]._id : values.department
    )
    if (data) {
      formData.append('id', data._id)
      await dispatch({
        type: 'categories/update',
        payload: formData,
      })
    } else {
      await dispatch({
        type: 'categories/create',
        payload: formData,
      })
    }
  }
  render() {
    const { departments, loading, data } = this.props
    return (
      <div>
        <Page inner>
          <Spin spinning={loading?.models?.departments}>
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
                  <span>Department</span>
                  <Form.Item
                    name="department"
                    initialValue={data?.department?.nameEn}
                    rules={[
                      { required: true, message: 'Please select a department' },
                    ]}
                  >
                    <Select>
                      {departments?.list?.map((elm, index) => {
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

Category.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Category
