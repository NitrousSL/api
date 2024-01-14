import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "carrier",
    description : "Searches a carrier for a given phone number.",

    category    : ModuleCategory.Phone,
    type        : ModuleType.Information,
}

export class Carrier extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        // Strip all non-numeric characters from the query.
        query = query.replace(/\D/g, '');

        // send error if missing country code
        if (query.length < 10) { return { status: 400, data: "Invalid phone number. Make sure to provide a country code. (US = 1 | RU = 7)" }; }

        const response = await axios.get(`https://api.telnyx.com/anonymous/v2/number_lookup/${query}`);

        const exists = response.data.carrier.name !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }
    }
}

module.exports = new Carrier;

// Path: src/module/impl/phone/carrier.ts
