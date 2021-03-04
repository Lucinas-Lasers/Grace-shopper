import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export const addToCart = props => {
  function onClick(e) {
    console.log('id:', props.record.id, 'price:', props.record.price)
  }

  return (
    <div>
      <button
        className="button"
        type="button"
        onClick={e => {
          onClick(e)
        }}
      >
        Add To Cart
      </button>
    </div>
  )
}

const mapDispatch = {}

export const ComponentAddToCart = connect(null, mapDispatch)(addToCart)
