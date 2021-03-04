import React from 'react'

const RecordPlayerForm = props => {
  const {state, editButton, handleChange, handleSubmit} = props
  return (
    <form id="addCampusform" onSubmit={handleSubmit}>
      <div>
        <label id="ab" htmlFor="name">
          Name:
        </label>
        <input name="name" onChange={handleChange} value={state.name} />
      </div>
      <div>
        <label htmlFor="year">Year:</label>
        <input name="year" onChange={handleChange} value={state.year} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          name="description"
          onChange={handleChange}
          value={state.description}
        />
      </div>
      <div className="editsubmitcontainer">
        <button id="submit" type="submit">
          Submit
        </button>
        <button id="cancel" type="button" onClick={editButton}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default RecordPlayerForm
