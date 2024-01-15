import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "snusbase-passwords",
    description : "Searches the Snusbase API v2 for passwords associated with a given email address",

    category    : ModuleCategory.Email,
    type        : ModuleType.Enrichment,
}

export class SnusbasePasswords extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://beta.snusbase.com/v2/combo/${query}`);

        if (response.data.size === 0) {

            return {
                status : 404,
                data   : null,
            };
        }

        let passwords: string[] = [];

        Object.keys(response.data.result).forEach((key: string) => {

            response.data.result[key].forEach((entry: any) => {

                passwords.push(entry.password);
            });
        });

        return {
            status : 200,
            data   : passwords,
        };
    }
}

module.exports = new SnusbasePasswords;

// Path: src/module/impl/email/snusbasePasswords.ts
