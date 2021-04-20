import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Provider from '../../components/Provider'

class CreateProvider extends Component {
  render() {
    const id = this.props.match.params.id
    return <Provider type={id} />
  }
}

CreateProvider.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateProvider
