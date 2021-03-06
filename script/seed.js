'use strict'

const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')
const products = [
  {
    name: 'Elephant',
    artist: 'The White Stripes',
    description: `Jack and Meg's career-defining album, pressed across two nice vinyl discs. "No computers were used during the writing, recording, mixing or mastering of this record" declare the sleeve notes. But you're reading this digitally, so you've gone and ruined it.
`,
    tracks: [
      'Seven Nation Army',
      '	Black Math',
      `There's No Home For You Here`,
      `I Just Don't Know What To Do With Myself`,
      `	In The Cold, Cold Night`,
      `I Want To Be The Boy To Warm Your Mother's Heart`,
      `You've Got Her In Your Pocket	`,
      `Ball And Biscuit`,
      `The Hardest Button To Button`,
      `Little Acorns Voice`,
      `Hypnotize`,
      `The Air Near My Fingers`,
      `Girl, You Have No Faith In Medicine`,
      `It's True That We Love One Another`
    ],
    price: 24990,
    type: `Record`,
    genre: 'Rock',
    albumTitle: `Elephant`,
    year: 2003,
    quantity: 10,
    image: `https://images.radiox.co.uk/images/15389?crop=16_9&width=660&relax=1&signature=CUGfGgP26y4wke1j9Bxn_8ADK2A=`
  },
  {
    name: 'Nevermind',
    artist: 'Nirvana',
    description: `Overrated
`,
    tracks: [
      `Smells Like Teen Spirit`,
      `In Bloom`,
      `Come As You Are`,
      `Breed`,
      `Lithium`,
      `Polly`,
      `Territorial Pissings`,
      `Drain You`,
      `Lounge Act`,
      `Stay Away`,
      `On A Plain`,
      `Something In The WayCello – Kirk Canning`,
      `Cello – Kirk Canning`
    ],
    price: 34990,
    type: `Record`,
    genre: 'Rock',
    albumTitle: `Nevermind`,
    year: 1991,
    quantity: 40,
    image: `https://images.radiox.co.uk/images/17658?crop=16_9&width=660&relax=1&signature=e6vjv7369jxL4mCJWMUyinOeqLo=`
  },
  {
    name: 'Yours Truly',
    artist: 'Ariana Grande',
    description: `An obvious choice? but you need that classic cover full size. Another record of two halves: you know all the famous tunes on side one, while side two digs into the band’s grunge roots, ending on Kurt Cobain’s introverted Something In The Way.


`,
    tracks: [
      `Honeymoon Avenue`,
      `Baby I`,
      `Right There`,
      `Tattooed Heart`,
      `Lovin' It`,
      `Piano`,
      `Daydreamin'`,
      `The Way`,
      `You’ll Never Know`,
      `Almost Is Never Enough`,
      `Popular Song`,
      `Better Left Unsaid`
    ],
    price: 19990,
    type: `Record`,
    genre: 'Pop',
    albumTitle: `Yours Truly`,
    year: 2013,
    quantity: 100,
    image: `https://img.discogs.com/JOLVjgDNo6WkDKItPIQZrtw9EcI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-4942434-1463667288-5138.jpeg.jpg`
  },
  {
    name: 'Positions',
    artist: 'Ariana Grande',
    description: `Positions is the sixth stuido album by Ariana Grande and features the RIAA Certified Platinum Single "positions" which peaked at #1 on Top 40 Radio in the US." The album also feature the follow up single "34+35" which is impacting Top 40 radio now! Coke Bottle Clear LP.
`,
    tracks: [
      ` shut up`,
      `34+35`,
      `motive featuring Doja Cat`,
      `just like magic`,
      `off the table`,
      `six thirty`,
      `safety net`,
      `my hair`,
      `nasty`,
      `west side`,
      `love language`,
      `positions`,
      `obvious`,
      `pov`
    ],
    price: 19990,
    type: `Record`,
    genre: 'Pop',
    albumTitle: `Positions`,
    year: 2021,
    quantity: 100,
    image: `https://i.ebayimg.com/images/g/5hwAAOSwv1hgG1BY/s-l500.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'X 100PRE ',
    artist: 'Bad Bunny',
    description: `X100PRE thrives as Bad Bunny's debut body of work, served with a modern sensibility of what Latin Urban can overcome and how influential it can be. X100PRE presents itself as a compilation of personal desires that are often nostalgic, celebratory, youthful and even introspective without losing relation to its listeners own experiences. Because of this, X100PRE has become a monumental masterpiece to the current Latino generations, capturing their very essence through words, sounds and colors.
`,
    tracks: [
      ` NI BIEN NI MAL`,
      `200 MPHFeaturing`,
      `¿Quién Tú Eres?`,
      `Caro`,
      `Tenemos Que Hablar`,
      `Otra Noche en Miami`,
      `Ser Bichote`,
      `Si Estuviésemos Juntos`,
      `Solo de Mí`,
      `Cuando Perriabas`,
      `La RomanaFeaturing`,
      `Como Antes`,
      `RLNDT`,
      `Estamos Bien`,
      `MÍAFeaturing `
    ],
    price: 24980,
    type: `Record`,
    genre: 'Reggaeton',
    albumTitle: `X 100PRE `,
    year: 2018,
    quantity: 10,
    image: `https://media.pitchfork.com/photos/5c2cdf59673bd655963c817c/1:1/w_600/X%20100PRE_Bad%20Bunny.jpg`
  },
  {
    name: 'Victrola Vintage 3-Speed Bluetooth Portable',
    description: `The Victrola portable suitcase turntable is an absolute classic and loaded with features. Includes built-in Bluetooth technology to wirelessly stream music from any Bluetooth enabled device, 3-speed turntable (33 1/3, 45, 78 RPM), built-in speakers, 3.5mm aux-in jack for playing music from any non-Bluetooth device, RCA jack and headphone jack. Portable design and carry handle allows for tunes wherever you may go.
`,
    price: 54980,
    type: `Record_Player`,
    year: 2020,
    quantity: 10,
    image: `https://m.media-amazon.com/images/S/aplus-media/vc/777d4c9d-8a56-4c1c-b0c6-e91b40035aaa._SR285,285_.jpg`
  },
  {
    name: ' Victrola Nostalgic Classic Wood 6-in-1 Bluetooth',
    description: `With vintage looks on the outside & modern features inside, listen your way; vinyl records, CDs, cassettes, AM/FM radio or stream music from your smartphone via Bluetooth or 3.5 mm Aux/headphone jack
`,
    price: 84980,
    type: `Record_Player`,
    year: 2017,
    quantity: 1,
    image: `https://images-na.ssl-images-amazon.com/images/I/71dx2uYlj2L._AC_SL1200_.jpg`
  },
  {
    name: ' Victrola Nostalgic Classic Wood 6-in-1 Bluetooth',
    description: `With vintage looks on the outside & modern features inside, listen your way; vinyl records, CDs, cassettes, AM/FM radio or stream music from your smartphone via Bluetooth or 3.5 mm Aux/headphone jack
`,
    price: 84980,
    type: `Record_Player`,
    year: 2017,
    quantity: 1,
    image: `https://images-na.ssl-images-amazon.com/images/I/71dx2uYlj2L._AC_SL1200_.jpg`
  },
  {
    name: ' 1byone High Fidelity Belt Drive Turntable',
    description: `Exquisite Appearance, Built from wood and metal materials with a unique sense of layering, The streamlined corner design is truly atmospheric and stylish

`,
    price: 199990,
    type: `Record_Player`,
    year: 2020,
    quantity: 30,
    image: `https://images-na.ssl-images-amazon.com/images/I/71M3kcYuW2L._AC_SL1500_.jpg`
  },
  {
    name: ' Dummy',
    description: `Hsada wdfjkeskd add wekjdwdjkwe dhwekdjw edfhewd wjdwekdwe dwdew dwed ewd wewedw dwefdwedwjw edwj fjkwef kwejdwd wdkwejwekfwejkf wefjw fjewfew fwejf ewjfwefj we.

`,
    price: 99990,
    type: `Record_Player`,
    year: 2020,
    quantity: 30,
    image: `https://images-na.ssl-images-amazon.com/images/I/71M3kcYuW2L._AC_SL1500_.jpg`
  }
]

const users = [
  {
    firstName: `Viral`,
    middleName: ``,
    lastName: `Patel`,
    admin: true,
    email: `viral@aol.com`,
    password: `password`
  },
  {
    firstName: `Yoshie`,
    middleName: ``,
    lastName: `Fujiwara`,
    admin: false,
    email: `yoshie@aol.com`,
    password: `password`
  },
  {
    firstName: `Shawn`,
    middleName: ``,
    lastName: `Gay`,
    admin: false,
    email: `shawn@aol.com`,
    password: `password123`
  },
  {
    firstName: `Diego`,
    middleName: ``,
    lastName: `Abreu`,
    admin: true,
    email: `diego@aol.com`,
    password: `password123`
  }
]

const orders = [
  {
    status: 'open',
    userId: 1
  },
  {
    status: 'open',
    userId: 2
  },
  {
    status: 'fulfilled',
    userId: 2
  },

  {
    status: 'fulfilled',
    userId: 3
  },
  {
    status: 'open',
    userId: 3
  },
  {
    status: 'open',
    userId: 4
  }
]

const carts = [
  {orderId: 1, productId: 2, qty: 2, price: 1000},

  {
    orderId: 2,
    productId: 1,
    qty: 3,
    price: 2050
  },

  {
    orderId: 2,
    productId: 3,
    qty: 1,
    price: 3099
  },

  {
    orderId: 3,
    productId: 1,
    qty: 2,
    price: 1000
  },

  {
    orderId: 4,
    productId: 1,
    qty: 1,
    price: 2050
  },

  {
    orderId: 4,
    productId: 15,
    qty: 1,
    price: 15000
  },

  {
    orderId: 5,
    productId: 15,
    qty: 1,
    price: 15000
  }
]

async function seed() {
  await db.sync({force: false})
  console.log('db synced!')

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    orders.map(order => {
      return Order.create(order)
    })
  )

  await Promise.all(
    carts.map(cart => {
      return ProductOrder.create(cart)
    })
  )

  // const users = await Promise.all([
  //   User.create({email: 'cody@email.com', password: '123'}),
  //   User.create({email: 'murphy@email.com', password: '123'}),
  // ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
