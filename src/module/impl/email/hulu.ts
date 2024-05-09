import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "hulu",
    description : "Searches for Hulu profile existence based on a given email.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

export class Hulu extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        /* This works locally, but not on the server? TODO: fix this
        const response = await axios.get(`https://signup.hulu.com/api/v3/accounts/status?email=${query}`);

        const exists = response.data.status === 'existing';

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        } */

        return {
            status : 404,
            data   : 'Module is temporarily disabled.',
        }
    }
}

module.exports = new Hulu;

// Path: src/module/impl/email/hulu.ts
