import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Reducer
import {
  fetchSingleRecordPlayer,
  editSingleRecordPlayer
} from '../store/singleRecordPlayer'
import RecordPlayerForm from './recordPlayerForm'
import {ComponentAddToCart} from './componentAddToCart'
import {fetchCartInfo} from '../store/cart'

class SingleRecordPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      year: '',
      edit: true
    }
    this.editButton = this.editButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  editButton() {
    this.setState(currentValue => ({
      edit: !currentValue.edit
    }))
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    const {name, description, year} = this.state
    await this.props.editSingleRecordPlayer({
      ...this.props.singleRecordPlayer.recordplayer,
      name,
      description,
      year
    })
    this.editButton()
    await this.props.fetchSingleRecordPlayer(this.props.match.params.id)
  }

  async componentDidMount() {
    await this.props.fetchSingleRecordPlayer(this.props.match.params.id)

    if (this.props.singleRecordPlayer.recordplayer) {
      const {
        name,
        description,
        year
      } = this.props.singleRecordPlayer.recordplayer
      this.setState({
        name,
        description,
        year
      })
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.user.id && this.props.user.id !== prevProps.user.id) {
      await this.props.getCartInfo(this.props.user.id)
      await this.props.fetchSingleRecordPlayer(this.props.match.params.id)
    }
    if (
      prevProps.singleRecordPlayer.recordplayer &&
      prevProps.singleRecordPlayer.recordplayer !==
        this.props.singleRecordPlayer.recordplayer
    ) {
      const {
        name,
        description,
        year
      } = this.props.singleRecordPlayer.recordplayer
      this.setState({
        name,
        description,
        year
      })
    }
  }

  render() {
    const record = this.props.singleRecordPlayer.recordplayer
    return !this.props.singleRecordPlayer.loading ? (
      <div className="singleRecord">
        {
          <div key={record.id} className="album">
            <img src={record.image} />
            <h1>{record.name}</h1>
            <p>{record.price / 1000}</p>
            <ComponentAddToCart
              record={record}
              cart={this.props.cart}
              getCartInfo={this.props.getCartInfo}
              isLoggedIn={!!this.props.user.id}
            />
          </div>
        }{' '}
        {this.props.user.admin ? (
          !this.state.edit ? (
            <RecordPlayerForm
              state={this.state}
              editButton={this.editButton}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          ) : (
            <div>
              {' '}
              <button id="cancel" type="button" onClick={this.editButton}>
                Edit
              </button>
            </div>
          )
        ) : (
          <div>Not an Admin</div>
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  singleRecordPlayer: state.singleRecordPlayerReducer,
  user: state.user,
  cart: state.cartReducer.cart[0]
})

const mapDispatch = (dispatch, {history}) => ({
  fetchSingleRecordPlayer: id => {
    dispatch(fetchSingleRecordPlayer(id, history))
  },
  editSingleRecordPlayer: id => {
    dispatch(editSingleRecordPlayer(id, history))
  },
  getCartInfo: id => dispatch(fetchCartInfo(id))
})

export const singleRecordPlayer = connect(mapState, mapDispatch)(
  SingleRecordPlayer
)
