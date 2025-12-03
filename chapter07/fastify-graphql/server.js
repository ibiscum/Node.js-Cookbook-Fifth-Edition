import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})

import mercurius from 'mercurius';
import { readFileSync } from 'fs';
import * as resolvers from './resolvers.js';

const schema = readFileSync('./schema.graphql', 'utf-8');

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true
});

fastify.listen({ port: 3000 }, () => {
  console.log('Server running at http://localhost:3000');
});
