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
      edit: false
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

  componentDidMount() {
    this.props.fetchSingleRecordPlayer(this.props.match.params.id)
    console.log('cdm', this.props.singleRecordPlayer.recordplayer)

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

  componentDidUpdate(prevProps) {
    console.log('CDU', prevProps)
    if (
      !prevProps.singleRecordPlayer.recordplayer &&
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
    console.log('render', this.props)
    const record = this.props.singleRecordPlayer.recordplayer
    return !this.props.singleRecordPlayer.loading ? (
      <div className="singleRecord">
        {
          <div key={record.id} className="album">
            <img src={record.image} />
            <h1>{record.name}</h1>
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
  user: state.user
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
