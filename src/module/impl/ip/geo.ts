import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "geo",
    description : "Searches a location for a given IP address.",

    category    : ModuleCategory.IP,
    type        : ModuleType.Enrichment,
}

export class Geo extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://ipapi.co/${query}/json/`)

        const exists = response.data !== '';

        return {
            status : exists ? 200           : 404,
            data   : exists ? response.data : null,
        }
    }
}

module.exports = new Geo;

// Path: src/module/impl/ip/geo.ts
