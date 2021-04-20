import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Service from '../components/Service'

@connect(({ services, loading }) => ({ services, loading }))
class CreateService extends Component {
  render() {
    return (
      <div>
        <Service />
      </div>
    )
  }
}

CreateService.propTypes = {
  user: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateService
