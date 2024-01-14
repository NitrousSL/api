import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import { exec }           from "child_process";
import path               from "path";


const META: ModuleMeta = {
    name        : "ghunt",
    description : "Searches Google profile info using Ghunt based on a given gmail address.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Information,
}

const ghunt = path.join(__dirname, "..", "..", "..", "..", "bin", "ghuntQuery.py");

export class Ghunt extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const result = await new Promise((resolve, reject) => {
            exec(`python3.10 ${ghunt} ${process.env.GHUNT_CREDS} ${query}`, (err, stdout, stderr) => {
                if (err) { reject(err); }
                resolve(stdout);
            });
        });

        const exists = JSON.parse(<string>result) !== 'false';

        return {
            status : exists ? 200                        : 404,
            data   : exists ? JSON.parse(<string>result) : null,
        };
    }
}

module.exports = new Ghunt;

// Path: src/module/impl/email/ghunt.ts
