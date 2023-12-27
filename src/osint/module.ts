import { Category } from "@osint/category";

import RequireAll   from "require-all";
import path         from "path";

export class Module {

    public name          : string;
    public description   : string;

    public category      : Category;

    constructor(meta: any) {

        this.name        = meta.name;
        this.description = meta.description;
        this.category    = meta.category;
    }

    public async query(query: string): Promise<any> { throw new Error("Method not implemented."); }
}

export function getModules() : Module[] {

    let indexed : Module[] = [];

    for (const cat in Category) {

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