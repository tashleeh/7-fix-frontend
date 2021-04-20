import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Department from '../components/Department'

class CreateDepartment extends Component {
  render() {
    return (
      <div>
        <Department />
      </div>
    )
  }
}

CreateDepartment.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateDepartment
