import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "cnam",
    description : "Searches for a name and location (CNAM) using a given phone number.",

    category    : ModuleCategory.Phone,
    type        : ModuleType.Information,
}

export class CNAM extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        // Strip all non-numeric characters from the query.
        query = query.replace(/\D/g, '');

        // send error if missing country code
        if (query.length < 10) { return { status: 400, data: "Invalid phone number. Make sure to provide a country code. (US = 1 | RU = 7)" }; }

        const response = await axios.get(`https://callername.com/api/amp/callerid/${query}.json?__amp_source_origin=https://callername.com`, {
            headers: {
                'amp-same-origin': 'true',
            }
        });

        const exists = response.data.name !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }
    }
}

module.exports = new CNAM;

// Path: src/module/impl/phone/cnam.ts
