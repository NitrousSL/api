import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "whois",
    description : "Searches whois info for a given domain name.",

    category    : ModuleCategory.Domain,
    type        : ModuleType.Enrichment,
}

export class WhoIs extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://api.api-ninjas.com/v1/whois?domain=${query}`, {
            headers: {
                'X-Api-Key': process.env.API_NINJAS_KEY as string
            }
        });

        const exists = response.data !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }
    }
}

module.exports = new WhoIs;

// Path: src/module/impl/domain/whois.ts
