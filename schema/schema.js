const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;
const Authors = require("../models/Authors");
const Books = require("../models/Books");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorId: {
      type: authorType,
      async resolve(parent, args) {
        return await Authors.findById(parent.authorId);
      },
    },
  }),
});

const authorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    ownBooks: {
      type: new GraphQLList(GraphQLString),
      resolve(parent, args) {
        return parent.ownBooks;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        // code to get data from db/other
        return await Books.findById(args.id);
      },
    },
    author: {
      type: authorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Authors.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Books.find();
      },
    },
    authors: {
      type: new GraphQLList(authorType),
      async resolve(parent, args) {
        return await Authors.find();
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: authorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        let author = await Authors.create({
          name: args.name,
          age: args.age,
        });
        await author.save();
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const book = await Books.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        const author = await Authors.findById(args.authorId);
        await book.save();
        author.ownBooks.push(book.name);
        await author.save();
        return book;
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
