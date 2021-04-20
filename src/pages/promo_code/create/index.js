import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PromoCode from '../components/PromoCode'

class CreatePromoCode extends Component {
  render() {
    return (
      <div>
        <PromoCode />
      </div>
    )
  }
}

CreatePromoCode.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default CreatePromoCode
