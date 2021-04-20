import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'

class Offers extends Component {
  render() {
    return (
      <Page inner>
        <Filter />
        <List />
      </Page>
    )
  }
}

Offers.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Offers
