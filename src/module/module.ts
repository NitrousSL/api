import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleMeta }     from "@interface/iModuleMeta";

import RequireAll         from "require-all";
import path               from "path";

/*
    * @return { Module }
    * @description Module superclass.
*/
export class Module {

    public meta: ModuleMeta;
    public sandbox: any;

    constructor(meta: ModuleMeta, sandbox: any) { this.meta = meta; this.sandbox = sandbox; }

    public async query(query: string): Promise<any> { throw new Error("Method not implemented."); }

    public async execute(query: string): Promise<any> {

        // start timer

        try {
            return await this.query(query);
        } catch (e) {
            // TODO: log this error as a metric
            throw new Error(`Module ${this.meta.name} failed to execute query: ${e}`);
        } finally {

            // TODO log usage / perf metric
            // end timer
        }

    }
}

/*
    * @return { Module[] }
    * @description Returns an array of all modules.
*/
export function getModules() : Module[] {

    let indexed : Module[] = [];

    for (const cat in ModuleCategory) {

        const modules = Object.entries(
          RequireAll({
              dirname: path.join(__dirname, `impl/${cat.valueOf().toLowerCase()}`),
              filter: /^(?!-)(.+)\.js$/,
          })
        );

        modules.forEach(m => { indexed.push(m[1]) });
    }

    return indexed;
}

// Path: src/module/module.ts
