import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import { Page } from 'components'
import List from './components/List'

@connect(({ invoices, loading }) => ({ invoices, loading }))
class Invoices extends Component {
  render() {
    return (
      <Page inner>
        <List />
      </Page>
    )
  }
}

Invoices.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Invoices
