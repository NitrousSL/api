import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "cnam",
    description : "Searches for a name and location (CNAM) using a given phone number.",

    category    : ModuleCategory.Phone,
    type        : ModuleType.Enrichment,
}

export class CNAM extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        /*
        const response = await axios.get(`https://callername.com/api/amp/callerid/${query}.json?__amp_source_origin=https://callername.com`, {
            headers: {
                'amp-same-origin': 'true',
            }
        });

        const exists = response.data.name !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }*/

        return { status: 404, data: "This module is currently unavailable."}
    }
}

module.exports = new CNAM;

// Path: src/module/impl/phone/cnam.ts
