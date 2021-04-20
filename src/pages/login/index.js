import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Button, Row, Input, Form } from 'antd'
import { GlobalFooter } from 'components'
import { GithubOutlined } from '@ant-design/icons'
import { Trans } from '@lingui/react'
import config from 'utils/config'

import styles from './index.less'

const FormItem = Form.Item

@connect(({ loading }) => ({ loading }))
class Login extends PureComponent {
  render() {
    const { dispatch, loading } = this.props

    const handleOk = (values) => {
      dispatch({
        type: 'login/login',
        payload: { ...values },
      })
    }
    let footerLinks = [
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/zuiidea/antd-admin',
        blankTarget: true,
      },
    ]

    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            <span>{config.siteName}</span>
          </div>
          <Form onFinish={handleOk}>
            <FormItem
              name="phoneNumber"
              rules={[{ required: true }]}
              hasFeedback
            >
              <Input placeholder="phoneNumber" />
            </FormItem>
            <FormItem name="password" rules={[{ required: true }]} hasFeedback>
              <Input type="password" placeholder="Password" />
            </FormItem>
            <Row>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading.effects.login}
              >
                <Trans>Sign in</Trans>
              </Button>
            </Row>
          </Form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Login
