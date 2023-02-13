const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    thoughts: [Thought]!
  }

  type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(thoughtId: ID!): Thought
    me: User
  }

    type Query {
        me: User
        posts(username: String): [Post]
        post(postId: ID!): Post
        comments(postId: ID!): [Comment]
        users: [User]

    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(postText: String!): Post
        addComment(postId: ID!, commentText: String!): Post
        removePost(postId: ID!): Post
        removeComment(postId: ID!, commentId: ID!): Post
        saveRecipe(idMeal: String!, strMeal: String!, strCategory: String!, strArea: String!, strInstructions: String!, strMealThumb: String!, strTags: String!, strYoutube: String!, strIngredient1: String!, strIngredient2: String!, strIngredient3: String!, strIngredient4: String!, strIngredient5: String!, strIngredient6: String!, strIngredient7: String!, strIngredient8: String!, strIngredient9: String!, strIngredient10: String!, strIngredient11: String!, strIngredient12: String!, strIngredient13: String!, strIngredient14: String!, strIngredient15: String!, strIngredient16: String!, strIngredient17: String!, strIngredient18: String!, strIngredient19: String!, strIngredient20: String!, strMeasure1: String!, strMeasure2: String!, strMeasure3: String!, strMeasure4: String!, strMeasure5: String!, strMeasure6: String!, strMeasure7: String!, strMeasure8: String!, strMeasure9: String!, strMeasure10: String!, strMeasure11: String!, strMeasure12: String!, strMeasure13: String!, strMeasure14: String!, strMeasure15: String!, strMeasure16: String!, strMeasure17: String!, strMeasure18: String!, strMeasure19: String!, strMeasure20: String!): User
        removeRecipe(idMeal: String!): User
    }
`;

module.exports = typeDefs;
