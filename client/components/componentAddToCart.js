import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCartInfo, addingToCart, updateToCart} from '../store/cart'

export const addToCart = props => {
  async function onClick(evt) {
    //add to props + 1 database of item
    evt.preventDefault()
    let copyArray = props.cart.products.slice()
    let filterArray = copyArray.filter(product => {
      if (product.id === props.record.id) {
        return product
      }
    })

    if (filterArray.length > 0) {
      await props.updateToCart({
        orderId: props.cart.id,
        price:
          parseInt(props.record.price) +
          parseInt(filterArray[0]['product-order'].price),
        qty: parseInt(filterArray[0]['product-order'].qty) + 1,
        productId: props.record.id
      })
    } else {
      await props.addedToCart({
        orderId: props.cart.id,
        price: props.record.price,
        qty: 1,
        productId: props.record.id
      })
    }
    await props.getCartInfo(props.cart.user.id)
  }

  // let arr = props.cart.filter(
  //   (element) => element.productId === props.match.params.id
  // )
  // if (props.cart.productId === props.match.params.id)
  //   const {id, price, qty} = props.cart
  // qty = parseInt(qty) + 1
  // props.updateCart({
  //   ...props.order,
  //   productId,
  //   price,
  //   qty,
  // })

  // props.updateCart()
  // console.log(props)

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

const mapState = state => ({
  cart: state.cartReducer
})

const mapDispatch = dispatch => {
  return {
    addedToCart: id => dispatch(addingToCart(id)),
    updateToCart: id => dispatch(updateToCart(id))
  }
}

export const ComponentAddToCart = connect(mapState, mapDispatch)(addToCart)
