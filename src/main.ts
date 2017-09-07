import * as fs from 'fs';
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as Router from 'koa-router';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';
import { makeExecutableSchema } from 'graphql-tools';

import * as resolvers from './resolvers';

const typeDefs = fs.readFileSync(`${__dirname}/schema.gql`, 'utf8');

const schema = makeExecutableSchema({ typeDefs, resolvers: <any>resolvers });

const app = new Koa();

const router = new Router();

const rootValue = { foo: 'foo' };

const context = { bar: 'bar' };

app.use(bodyParser());

router.get('/graphql', graphqlKoa({ schema, rootValue, context }));
router.post('/graphql', graphqlKoa({ schema, rootValue, context }));
router.get('/graphiql', graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());

app.listen(3000, () => console.log('server listen 3000'));