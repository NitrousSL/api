import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "twitter",
    description : "Searches for Twitter profile info based on a given email.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

export class Twitter extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://api.twitter.com/i/users/email_available.json?email=${query}`);
        const exists = response.data.taken;

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        }
    }
}

module.exports = new Twitter;

// Path: src/module/impl/email/twitter.ts
