import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// Reducer

const EditProduct = props => {
  return (
    <div>
      <Link to={`/recordplayer/${props.product}`}>
        <button className="editdelete" type="button">
          Edit
        </button>
      </Link>
      <button
        id="studentdelete"
        type="button"
        onClick={() => props.deleteItem(props.product)}
      >
        Delete
      </button>
    </div>
  )
}

export default EditProduct

//pass in through props a delete method
//pass in through props a edit feature
