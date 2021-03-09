/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Order = db.model('order')

describe('User routes', () => {
  /**
   * clear the database before beginning each run
   */
  beforeEach(() => {
    return db.sync({force: true})
  })

  /**
   * Also, we empty the tables after each spec
   */
  afterEach(() => {
    return Promise.all([
      Order.truncate({cascade: true}),
      User.truncate({cascade: true})
    ])
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')

  describe('/api/users/:userId/orders', () => {
    it('returns open order for a newly created user:  GET /api/order/user/:userId', async () => {
      const codysEmail = 'cody@puppybook.com'

      const newUser = await User.create({
        firstName: 'Cody',
        lastName: 'the Pug',
        email: codysEmail
      })

      const res = await request(app)
        .get(`/api/users/${newUser.id}/orders`)
        .expect(200)

      //console.log('res', res)

      // 3.9.21 YF - below expected outcome needs more adjustment
      expect(res.body).to.be.an('array')
      expect(res.body[0].orders[0].status).to.be.equal('open')
    })
  }) // end describe('/api/user/:userId/orders')
}) // end describe('User routes')
