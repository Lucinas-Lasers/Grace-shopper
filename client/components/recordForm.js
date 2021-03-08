import React from 'react'

const RecordForm = props => {
  const {state, editButton, handleChange, handleSubmit} = props
  return (
    <form id="recordform" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Album:</label>
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
      <div className="submit">
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

export default RecordForm
