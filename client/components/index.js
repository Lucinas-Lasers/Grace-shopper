/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
import Cart from './cart'
export {adminPage} from './adminPage'

export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Signup} from './Signup'
export {Login} from './Login'

export {Cart}

export {allRecords} from './allRecords'
export {singleRecord} from './singleRecord'

export {allRecordPlayers} from './allRecordPlayers'
export {singleRecordPlayer} from './singleRecordPlayer'

export {allProducts} from './allProducts'
export {allUsers} from './allUsers'
export {confirmationPage} from './confirmationPage'
