import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "snapchat",
    description : "Searches for SnapChat profile existence based on a given username.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

export class Snapchat extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.post('https://bitmoji.api.snapchat.com/api/user/find',
            {
                email: query,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

        const exists = JSON.stringify(response.data).includes('{"account_type":"bitmoji"}');

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        }
    }
}

module.exports = new Snapchat;

// Path: src/module/impl/email/snapchat.ts
