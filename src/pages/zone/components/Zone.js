import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Row, Col, Button, Form, Input, Select, Spin } from 'antd'
import { Page } from 'components'
import Map from './Map'

@connect(({ zone, loading }) => ({ zone, loading }))
class Zone extends Component {
  state = {
    location: [],
  }
  onFinish = async (values) => {
    const { nameAr, nameEn, Neighborhood } = values
    const { location } = this.state
    const { dispatch, data } = this.props
    await dispatch({
      type: 'zone/create',
      payload: { nameAr, nameEn, location, Neighborhood },
    })
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

                  <span>Neighborhood</span>
                  <Form.Item
                    name="Neighborhood"
                    initialValue={data?.Neighborhood}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the Neighborhood',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <span>Location</span>
                  <Form.Item
                    name="location"
                    initialValue={data?.location}
                    // rules={[
                    //   { required: true, message: 'Please add the location' },
                    // ]}
                  >
                    <Map
                      onLocationValue={(location) =>
                        this.setState({ location })
                      }
                    />
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

Zone.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Zone
