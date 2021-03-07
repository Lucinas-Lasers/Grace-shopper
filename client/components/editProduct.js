import React from 'react'
import {Link} from 'react-router-dom'
// Reducer

const EditProduct = props => {
  let type = props.type
    .toLowerCase()
    .split('_')
    .join('')
  return (
    <div>
      <Link to={`/${type}/${props.product}`}>
        <button className="editdelete" type="button">
          Edit
        </button>
      </Link>
      <button
        id=""
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
