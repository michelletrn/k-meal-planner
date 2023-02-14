const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Comment, Recipe } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      me: async (parent, args, context) => {
          if (context.user) {
              return User.findOne({ _id: context.user._id }).populate('posts').populate('savedRecipes');
          }
          throw new AuthenticationError('You need to be logged in!');
      },
      posts: async (parent, {username}) => {
        const params = username ? {username} : {};
        return Post.find(params).sort({createdAt: -1});
      },
      post: async (parent, {postId}) => {
        return Post.findOne({_id: postId}).populate('comments');
      },
      comments: async (parent, {postId}) => {
        const params = postId ? {postId} : {};
        return Comment.find(params).sort({createdAt: -1});
      },
      users: async () => {
        return User.find().populate('posts').populate('savedRecipes');
      },
  },
  Mutation: {
      addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
          return { token, user };
      },
      login: async (parent, { email, password }) => {
          const user = await User.findOne({ email });

          if (!user) {
              throw new AuthenticationError('No user found with this email address');
          }

          const correctPw = await user.isCorrectPassword(password);

          if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
          }

          const token = signToken(user);

          return { token, user };
      },
      addPost: async (parent, { postText }, context) => {
          if (context.user) {
              const post = await Post.create({
                  postText,
                  postAuthor: context.user.username,
              });

              await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { posts: post._id } }
              );

              return post;
          }
          throw new AuthenticationError('You need to be logged in!');
      },
      removePost: async (parent, { postId }, context) => {
          if (context.user) {
            const post = await post.findOneAndDelete({
              _id: postId,
              postAuthor: context.user.username,
            });
    
            await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { posts: post._id } }
            );
    
            return post;
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      addComment: async (parent, { postId, commentText }, context) => {
          if (context.user) {
              return Post.findOneAndUpdate(
                  { _id: postId },
                  {
                      $addToSet: {
                          comments: { commentText, commentAuthor: context.user.username },
                      },
                  },
                  {
                      new: true,
                      runValidators: true,
                  }
              );
          }
          throw new AuthenticationError('You need to be logged in!');
      },
      removeComment: async (parent, { postId, commentId }, context) => {
          if (context.user) {
            return Post.findOneAndUpdate(
              { _id: postId },
              {
                $pull: {
                  comments: {
                    _id: commentId,
                    commentAuthor: context.user.username,
                  },
                },
              },
              { new: true }
            );
          }
          throw new AuthenticationError('You need to be logged in!');
        },
      saveRecipe: async (parent, { mealData }, context) => {
          console.log("mealData:",mealData);
          if (context.user) {

              const { idMeal, strMeal, strCategory, strArea, strInstructions, strMealThumb, strTags, strYoutube, strIngredients, strMeasures} = mealData;

              try {
              const recipe = await Recipe.create({
                  idMeal,
                  strMeal,
                  strCategory,
                  strArea,
                  strInstructions,
                  strMealThumb,
                  strTags,
                  strYoutube,
                  strIngredients,
                  strMeasures
              });

              console.log("recipe:",recipe);

              return await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $addToSet: { savedRecipes: recipe._id } },
                  { new: true,}
              );

            } catch (err) {
              console.log(err);
              return err;
            }
          }
          throw new AuthenticationError('You need to be logged in!');
      },
      removeRecipe: async (parent, { idMeal }, context) => {
          if (context.user) {

              const recipe = await Recipe.findOneAndDelete({

              return await User.findOneAndUpdate(
                  { _id: context.user._id },
                  { $pull: { savedRecipes: { idMeal } } },
                  { new: true,}
              );
          }
      }
  }
}

module.exports = resolvers;
