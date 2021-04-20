import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../services/components/list.less'
import { Trans } from '@lingui/react'
import { history } from 'umi'
import { Button, Row, Col, Form } from 'antd'
import '../../../layouts/BaseLayout.less'
import _ from 'lodash'

class Filter extends Component {
  formRef = React.createRef()

  render() {
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
                <Col xs={0} md={0} lg={20}></Col>
                <Col xs={24} md={12} lg={4}>
                  <div className="mt10">
                    <Button
                      type="ghost"
                      className="add-button"
                      onClick={() =>
                        history.push({
                          pathname: '/packages/create',
                        })
                      }
                    >
                      <Trans> + Add Package</Trans>
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
