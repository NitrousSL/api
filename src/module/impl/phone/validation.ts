import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "validation",
    description : "Validates phone number and returns location info using API Ninjas.",

    category    : ModuleCategory.Phone,
    type        : ModuleType.Enrichment,
}

export class Validation extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://api.api-ninjas.com/v1/validatephone?number=${query}`, {
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

module.exports = new Validation;

// Path: src/module/impl/domain/validation.ts
