const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLInputObjectType
  } = require('graphql');
  const User = require('../models/user');
  
  // Tipo Profile anidado
  const ProfileType = new GraphQLObjectType({
    name: 'Profile',
    fields: () => ({
      experience: { type: new GraphQLList(GraphQLString) },
      education: { type: new GraphQLList(GraphQLString) },
      projects: { type: new GraphQLList(GraphQLString) },
      skills: { type: new GraphQLList(GraphQLString) },
      references: { type: new GraphQLList(GraphQLString) }
    })
  });
  
  // Tipo User
  const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: { type: GraphQLString }, // importante si quieres consultar por ID
      username: { type: GraphQLString },
      password: { type: GraphQLString },
      displayName: { type: GraphQLString },
      email: { type: GraphQLString },
      phoneNumber: { type: GraphQLString },
      currentLocation: { type: GraphQLString },
      openToNewOpportunities: { type: GraphQLBoolean },
      profileIsPublic: { type: GraphQLBoolean },
      theme_name: { type: GraphQLString },
      profile: { type: ProfileType }
    })
  });
  
  // Input para mutations
  const ProfileInputType = new GraphQLInputObjectType({
    name: 'ProfileInput',
    fields: () => ({
      experience: { type: new GraphQLList(GraphQLString) },
      education: { type: new GraphQLList(GraphQLString) },
      projects: { type: new GraphQLList(GraphQLString) },
      skills: { type: new GraphQLList(GraphQLString) },
      references: { type: new GraphQLList(GraphQLString) }
    })
  });
  
  // Root Query
  const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      users: {
        type: new GraphQLList(UserType),
        resolve() {
          return User.find();
        }
      },
      user: {
        type: UserType,
        args: { id: { type: GraphQLString } },
        resolve(parent, args) {
          return User.findById(args.id);
        }
      }
    }
  });
  
  // Mutation
  const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addUser: {
        type: UserType,
        args: {
          username: { type: GraphQLString },
          password: { type: GraphQLString },
          displayName: { type: GraphQLString },
          email: { type: GraphQLString },
          phoneNumber: { type: GraphQLString },
          currentLocation: { type: GraphQLString },
          openToNewOpportunities: { type: GraphQLBoolean },
          profileIsPublic: { type: GraphQLBoolean },
          theme_name: { type: GraphQLString },
          profile: { type: ProfileInputType }
        },
        resolve(parent, args) {
          const user = new User({
            username: args.username,
            password: args.password,
            displayName: args.displayName,
            email: args.email,
            phoneNumber: args.phoneNumber,
            currentLocation: args.currentLocation,
            openToNewOpportunities: args.openToNewOpportunities,
            profileIsPublic: args.profileIsPublic,
            theme_name: args.theme_name,
            profile: args.profile
          });
  
          return user.save();
        }
      }
    }
  });
  
  // Exporta el schema
  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
  });
  