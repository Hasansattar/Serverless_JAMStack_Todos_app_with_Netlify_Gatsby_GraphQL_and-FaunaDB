const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {   
   todos: [Todo!]
  }
   
  type Mutation{
    addTodo(task:String!): Todo
  }
  

  type Todo {
    id: ID!
    task: String!
    status: Boolean!
  }
`

const resolvers = {
  Query: {
    todos: async () => {
      try {
        var adminClient = new faunadb.Client({ secret: 'fnAD6USJAlACAZclbn1CG-tLg-lvV7mp_sCEwD9e' });


        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('tasklist'))),
            q.Lambda(x => q.Get(x))
          )
        )

        console.log(result)
        result[{
          task:"hello",
          status:true,
          id:1
        }];

      }
      catch (error) {
        console.log(error);

      }
    },

  },

  Mutation: {
    addTodo: async (_, { task }) => {
      try {
        var adminClient = new faunadb.Client({ secret: 'fnAD6USJAlACAZclbn1CG-tLg-lvV7mp_sCEwD9e' });


        const result = await adminClient.query(

          q.Create(
            q.Collection('todoslist'),
            {
              data: {
                task: task,
                status: true
              }
            },
          )

        )

        console.log(result.ref.data)

        return result.ref.data;

      }
      catch (error) {
        console.log(error);

      }


    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.handler = server.createHandler()
