import * as graphql from "graphql";
import _ from "lodash";
const Todo = require("../models/todo");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const TodoType: any = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    isCompleted: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    todo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parent: any, args: any) {
        // return _.find(todos, { id: args.id });
        return Todo.findById(args.id);
      },
    },

    todos: {
      type: new GraphQLList(TodoType),
      resolve(parent: any, args: any) {
        // return todos;
        return Todo.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addTodo: {
      type: TodoType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent: any, args: any) {
        let todo = new Todo({
          name: args.name,
          isCompleted: false,
        });
        return todo.save();
      },
    },

    removeTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent: any, args: any) {
        let todo = Todo.findById(args.id);
        return todo.remove();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
