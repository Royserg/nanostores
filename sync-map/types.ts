import { Client } from '@logux/client'

import { SyncMap, subscribe } from '../index.js'

let client = new Client({
  subprotocol: '1.0.0',
  server: 'ws://localhost',
  userId: '10'
})

class User extends SyncMap {
  static plural = 'users'
  name!: string
  age?: number
}

let user = User.load('user:id', client)
user.change({ name: 'Ivan' })
user.change('name', 'Ivan')
user.change('age', 26)

user[subscribe]((store, diff) => {
  console.log(diff.name)
})

User.create(client, { id: 'user:1', name: 'A' })
User.create(client, { id: 'user:2', name: 'B', age: 12 })