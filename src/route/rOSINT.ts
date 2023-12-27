import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { Category}                                       from "@osint/category";
import { getModules }                                    from "@osint/module";

import RequireAll                                        from "require-all";
import path                                              from "path";

type Request = FastifyRequest<{
    Querystring: { query: string }
}>;

async function rOSINT(fastify: FastifyInstance) {

    const modules = getModules();

    // map out endpoints by module [category], {display name, desc, and route}
    const endpoints = modules.map(m => {
        return {
            name        : m.name,
            description : m.description,
            route       : `/${m.category.valueOf().toLowerCase()}/${m.name}`
        }
    });

    // return an array of each category, inside each category is an array of endpoints, each endpoint has a name, desc, and route
    fastify.get("/", async (req: FastifyRequest, res: FastifyReply) => {

        const data = Object.values(Category).map(c => {
            return {
                category  : c,
                endpoints : endpoints.filter(e => e.route.includes(c.valueOf().toLowerCase()))
            }
        });

        res.send(data);
    });

    for (const cat in Category) {

        const modules = Object.entries(
            RequireAll({
              dirname : path.join(__dirname, `../osint/impl/${cat.valueOf().toLowerCase()}`),
              filter  : /^(?!-)(.+)\.js$/,
          })
        );

        // query a specific module in a category
        modules.forEach(m => {

            fastify.get(`/${cat.valueOf().toLowerCase()}/${m[0]}`, async (req: Request, res: FastifyReply) => {

                const query = req.query.query;

                if (!query) { return res.send({ status: 400,  data: "No query was provided." }); }

                const data  = await m[1].query(query.replace(/^\s+|\s+$/g, ''));

                res.send(data);
            });
        });

        // query all modules in a category
        fastify.get(`/${cat.valueOf().toLowerCase()}`, async (req: Request, res: FastifyReply) => {

            const query = req.query.query;

            // return modules within category if no query is provided
            if (!query) { return res.send({
                category  : cat,
                endpoints : endpoints.filter(e => e.route.includes(cat.valueOf().toLowerCase()))
            }); }

            const data = await Promise.all(modules.map(async m => {

                return {
                    name : m[0],
                    data : await m[1].query(query.replace(/^\s+|\s+$/g, ''))
                }
            }));

            res.send(data);
        });
    }
}

export default rOSINT;