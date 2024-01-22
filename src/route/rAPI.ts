import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

import pkg                                               from "@package";

/*
    * @function rAPI
    * @param { FastifyInstance } fastify
    * @description Registers API related endpoints
*/
async function rAPI(fastify: FastifyInstance) {

    fastify.get("/version", async (req: FastifyRequest, res: FastifyReply) => { res.send({ version: pkg.version, environment: process.env.API_ENVIRONMENT }); });

}

export default rAPI;

// Path: src/route/rAPI.ts
