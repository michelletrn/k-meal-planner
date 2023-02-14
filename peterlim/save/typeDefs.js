const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        posts: [Post]
        savedRecipes: [Recipe]
    }

    type Post {
        _id: ID!
        postText: String!
        postAuthor: String!
        createdAt: String!
        comments: [Comment]
        # recipes: [Recipe]
    }

    type Comment {
        _id: ID!
        commentText: String!
        commentAuthor: String!
        createdAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Recipe {
        _id: ID!
        idMeal: String!
        strMeal: String
        strCategory: String
        strArea: String
        strInstructions: String
        strMealThumb: String
        strTags: [String]
        strYoutube: String
        strIngredients: [String]        
        strMeasures: [String]
    }

    input RecipeInput {
      idMeal: String!
      strMeal: String
      strCategory: String
      strArea: String
      strInstructions: String
      strMealThumb: String
      strTags: [String]
      strYoutube: String
      strIngredients: [String]        
      strMeasures: [String]
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
        
        saveRecipe(mealData: RecipeInput!) : User
        removeRecipe(idMeal: String!): User
    }
`;

module.exports = typeDefs;