import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Reducer
import {fetchSingleRecord, editSingleRecord} from '../store/singleRecord'
import {ComponentAddToCart} from './componentAddToCart'
import RecordForm from './recordForm'
import {fetchCartInfo} from '../store/cart'

class SingleRecord extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      year: '',
      edit: true,
      qty: ''
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
    await this.props.editSingleRecord({
      ...this.props.singleRecord.record,
      name,
      description,
      year
    })
    this.editButton()
    await this.props.fetchSingleRecord(this.props.match.params.id)
  }

  componentDidMount() {
    this.props.fetchSingleRecord(this.props.match.params.id)
    if (this.props.user.id) {
      this.props.getCartInfo(this.props.user.id)
    }

    if (this.props.singleRecord.record) {
      const {name, description, year} = this.props.singleRecord.record
      this.setState({
        name,
        description,
        year
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.singleRecord.record && this.props.singleRecord.record) {
      const {name, description, year} = this.props.singleRecord.record
      this.setState({
        name,
        description,
        year
      })
    }
    if (this.props.user.id && this.props.user.id !== prevProps.user.id) {
      this.props.getCartInfo(this.props.user.id)
    }
  }

  render() {
    const loading = this.props.singleRecord.loading
    let record = this.props.singleRecord.record
    return !loading ? (
      <div>
        <div key={record.id} className="albumList">
          <img src={record.image} />
          <div className="album">
            <h1>{record.name}</h1>
            <h1>{record.artist}</h1>
            <p>{record.description}</p>
            <p>{record.price}</p>
            {record.tracks.map((track, ind) => {
              return <div key={ind}> {track}</div>
            })}
            <ComponentAddToCart
              record={record}
              cart={this.props.cart}
              getCartInfo={this.props.getCartInfo}
            />

            {this.props.user.admin ? (
              !this.state.edit ? (
                <RecordForm
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
              <div />
            )}
          </div>
        </div>
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  singleRecord: state.singleRecordReducer,
  user: state.user,
  cart: state.cartReducer
})

const mapDispatch = dispatch => ({
  fetchSingleRecord: id => {
    dispatch(fetchSingleRecord(id))
  },
  editSingleRecord: info => {
    dispatch(editSingleRecord(info))
  },
  getCartInfo: id => dispatch(fetchCartInfo(id))
})

export const singleRecord = connect(mapState, mapDispatch)(SingleRecord)
