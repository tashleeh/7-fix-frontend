import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'

@connect(({ departments, loading }) => ({ departments, loading }))
class Departments extends Component {
  render() {
    return (
      <Page inner>
        <Filter />
        <List />
      </Page>
    )
  }
}

Departments.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Departments
