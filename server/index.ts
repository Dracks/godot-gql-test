import * as Fastify from 'fastify'
import mercurius from 'mercurius'

const schema = `
  type Query {
    hello(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: async (_, { name }) => `hello ${name || 'world'}`
  }
}

const app = Fastify()
app.register(mercurius, {
  schema,
  resolvers
})

app.listen({port:3150}).then(()=>console.log("Hello world!"))
