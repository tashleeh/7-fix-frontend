import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Zone from '../components/Zone'

class CreateZone extends Component {
  render() {
    return (
      <div>
        <Zone />
      </div>
    )
  }
}

CreateZone.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateZone
