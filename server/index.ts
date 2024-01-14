import * as Fastify from 'fastify'
import mercurius, { PubSub } from 'mercurius'

const schema = `

  type Message {
    name: String!
    message: String!
  }
  type Query {
    hello(name: String): String!
  }

  type Mutation {
    addMessage(name: String!, msg: String!): String
  }

  type Subscription{
    time: String
    newMessage: Message
  }
`
class StartTimer {
  private constructor(readonly pubsub: PubSub){

  }

  start(){
    setInterval(()=>{
      this.pubsub.publish({
        topic: "date",
        payload: {
          time: new Date().toISOString()
        }
      })
    }, 1000)
  }

  private static instance: StartTimer | undefined
  static initialize(pubsub: PubSub){
    if (!StartTimer.instance){
      new StartTimer(pubsub).start()
    }
  }
}
const resolvers = {
  Query: {
    hello: async (_, { name }) => `hello ${name || 'world'}`
  },
  Mutation: {
    addMessage: async (_, { name, msg }, { pubsub }) => {
      const message = { name, message: msg }

      pubsub.publish({
        topic: 'messages',
        payload: {
          newMessage: message
        }
      })
      return "OK"
    }
  },
  Subscription: {
    time: {
      subscribe: async (_, __, { pubsub }) => {
        StartTimer.initialize(pubsub)
        return await pubsub.subscribe('date')
      }
    },
    newMessage: {
      subscribe: async (_, __, {pubsub}) => {
        return await pubsub.subscribe('messages')
      }
    } 
  }
}

const app = Fastify()
app.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
  subscription: {
    // emitter,
    async onConnect ({ payload }) {
      app.log.info({ payload }, 'connection_init data')
      return true
    }
  },
  
})

app.listen({port:3150}).then(()=>console.log("Hello world!"))
