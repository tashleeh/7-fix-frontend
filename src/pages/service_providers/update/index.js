import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Provider from '../components/Provider'

@connect(({ loading, categories }) => ({ loading, categories }))
class UpdateProvider extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <Provider data={data} />
      </div>
    )
  }
}

UpdateProvider.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateProvider
