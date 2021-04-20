import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'

class Packages extends Component {
  render() {
    return (
      <Page inner>
        <Filter />
        <List />
      </Page>
    )
  }
}

Packages.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Packages
