import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "imgur",
    description : "Searches for Imgur profile existence based on a given email.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

export class Imgur extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.post(`https://imgur.com/signin/ajax_email_available`,
            {
                email: query
            }, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                }
            });

        const exists = response.data.available === false;

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        }
    }
}

module.exports = new Imgur;

// Path: src/module/impl/email/imgur.ts
