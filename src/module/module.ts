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

    constructor(meta: ModuleMeta) { this.meta = meta; }

    public async query(query: string): Promise<any> { throw new Error("Method not implemented."); }
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
