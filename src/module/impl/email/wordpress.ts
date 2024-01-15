import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "wordpress",
    description : "Checks if an email address is associated with a WordPress account.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

export class WordPress extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://public-api.wordpress.com/rest/v1.1/users/${query}/auth-options?http_envelope=1`);
        const exists = response.data.code === 404 && response.data.body;

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        }
    }
}

module.exports = new WordPress;

// Path: src/module/impl/email/wordpress.ts
