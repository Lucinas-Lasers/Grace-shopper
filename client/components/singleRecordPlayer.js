import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Reducer
import {
  fetchSingleRecordPlayer,
  editSingleRecordPlayer
} from '../store/singleRecordPlayer'
import RecordPlayerForm from './recordPlayerForm'

class SingleRecordPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      year: '',
      edit: false,
      admin: true,
      loading: false
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
      ...this.props.singleRecordPlayer,
      name,
      description,
      year
    })
    this.editButton()
    await this.props.fetchSingleRecordPlayer(this.props.match.params.id)
  }

  componentDidMount() {
    this.props.fetchSingleRecordPlayer(this.props.match.params.id)
    const {id, name, description, year} = this.props.singleRecordPlayer
    if (id) {
      this.setState({
        name,
        description,
        year
      })
    }
  }

  componentDidUpdate(prevProps) {
    const {id, name, description, year} = this.props.singleRecordPlayer
    if (prevProps.singleRecordPlayer.id !== id) {
      this.setState({
        name,
        description,
        year
      })
    }
  }

  render() {
    const record = this.props.singleRecordPlayer
    return record.id ? (
      <div className="singleRecord">
        {
          <div key={record.id} className="album">
            <img src={record.image} />
            <h1>{record.name}</h1>
          </div>
        }{' '}
        {!this.state.edit && this.state.admin ? (
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
        )}
      </div>
    ) : (
      <div>Loading...</div>
    )
  }
}

const mapState = state => ({
  singleRecordPlayer: state.singleRecordPlayerReducer
})

const mapDispatch = (dispatch, {history}) => ({
  fetchSingleRecordPlayer: id => {
    dispatch(fetchSingleRecordPlayer(id, history))
  },
  editSingleRecordPlayer: id => {
    dispatch(editSingleRecordPlayer(id, history))
  }
})

export const singleRecordPlayer = connect(mapState, mapDispatch)(
  SingleRecordPlayer
)
