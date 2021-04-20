import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Service from '../components/Service'

@connect(({ loading, services }) => ({ loading, services }))
class UpdateService extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <Service data={data} />
      </div>
    )
  }
}

UpdateService.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateService
