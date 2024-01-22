import "dotenv/config";

import pkg                          from "@package";

import fastify, { FastifyInstance } from "fastify";
import rateLimit                    from "@fastify/rate-limit";
import compress                     from "@fastify/compress";
import helmet                       from "@fastify/helmet";
import cors                         from "@fastify/cors";

/////////////////////////////////////////////////////////////
//
// Fastify / Server Configuration
//
/////////////////////////////////////////////////////////////

const PORT : number          = process.env.PORT ? parseInt(process.env.PORT) : 3008;
const HOST : String          = `localhost`;
const app  : FastifyInstance = fastify({ logger: false });

/////////////////////////////////////////////////////////////
//
// Fastify / Server Routes
//
/////////////////////////////////////////////////////////////

import rOSINT     from '@route/rOSINT';

/////////////////////////////////////////////////////////////

async function main(fastify: FastifyInstance) {

    // todo: env based ratelimiting handler
    await fastify.register(rateLimit, {
        max: 100,
        timeWindow: '1 minute'
    });

    await fastify.register(compress);
    await fastify.register(helmet);
    await fastify.register(cors);

    await rOSINT(fastify);

    fastify.listen({port: PORT}, (err, address) => {

        if (err) { console.error(err); process.exit(1); }
    });
}

main(app).then(r => { console.log(`[${new Date().toLocaleString()}] [${pkg.version}] | Server started and listening at [${HOST}:${PORT}]`); });

// Path: src/index.ts
