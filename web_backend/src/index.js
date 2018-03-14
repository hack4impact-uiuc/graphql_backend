import micro, {send} from 'micro';
import graphqlHTTP from 'express-graphql';
import Schema from './schema/schema.js';
const cors = require('micro-cors')()

const mongoose = require('mongoose');


const MONGO_URI = 'mongodb://shreyas:mohan@ds213239.mlab.com:13239/lwb';


mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

exports.default = cors(graphqlHTTP({ schema: Schema, pretty: true, graphiql: true }));