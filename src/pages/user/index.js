import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'

@withI18n()
@connect(({ user, loading }) => ({ user, loading }))
class User extends Component {
  render() {
    return (
      <Page inner>
        {/* <Filter {...this.filterProps} /> */}
        <List />
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default User
