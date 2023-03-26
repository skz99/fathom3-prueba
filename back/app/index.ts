// lib/app.ts
import fastifyAutoload from '@fastify/autoload';
import fastify from 'fastify'
const path = require('path')
const app = fastify()

app.register(fastifyAutoload, {
    dir: path.join(__dirname, 'routes')})

// Checks

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

/**
 * Run the app!
 */

const port = process.env.PORT as unknown as number || 8080;
const host = process.env.HOST || '0.0.0.0';

app.listen({ port: port, host: host }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`ENV ${process.env.NODE_ENV}`);
    console.log(`PORT ${port}`);
    console.log(`app listening at ${address}`)
})