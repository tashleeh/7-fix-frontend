import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Category from '../components/Category'

class CreateCategory extends Component {
  render() {
    return (
      <div>
        <Category />
      </div>
    )
  }
}

CreateCategory.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreateCategory
