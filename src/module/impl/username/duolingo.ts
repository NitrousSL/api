import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "duolingo",
    description : "Searches for Duolingo profile info based on a given username.",

    category    : ModuleCategory.Username,
    type        : ModuleType.Information,
}

export class Duolingo extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://www.duolingo.com/2017-06-30/users?username=${query}`);

        const exists = response.data.users.length > 0;

        return {
            status : exists ? 200                    : 404,
            data   : exists ? response.data.users[0] : null,
        }
    }
}

module.exports = new Duolingo;

// Path: src/module/impl/username/duolingo.ts
