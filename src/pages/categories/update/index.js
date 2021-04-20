import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'umi'
import Category from '../components/Category'

@connect(({ loading, categories }) => ({ loading, categories }))
class UpdateCategory extends Component {
  render() {
    const { data } = this.props
    return (
      <div>
        <Category data={data} />
      </div>
    )
  }
}

UpdateCategory.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default UpdateCategory
