"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql = __importStar(require("graphql"));
const Todo = require("../models/todo");
const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, } = graphql;
const TodoType = new GraphQLObjectType({
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
            resolve(parent, args) {
                // return _.find(todos, { id: args.id });
                return Todo.findById(args.id);
            },
        },
        todos: {
            type: new GraphQLList(TodoType),
            resolve(parent, args) {
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
            resolve(parent, args) {
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
            resolve(parent, args) {
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
