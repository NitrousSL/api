import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import { exec }           from "child_process";
import path               from "path";

const META: ModuleMeta = {
    name        : "google",
    description : "Searches Google profile info using Ghunt based on a given gmail address.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Enrichment,
}

// root/dist/src/module/impl/email/google.js => root/bin/ghuntQuery.py
const ghunt : string = path.join(__dirname, "../../../../../", "bin", "ghuntQuery.py");
const creds : string = path.join(__dirname, 'creds.txt');

export class Google extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        let execQuery : string = `python3.10 ${ghunt} ${query} `;

        // only append creds if they are not found to prevent potential leaks
        if (!creds) { execQuery += process.env.GHUNT_CREDS; }

        const result = await new Promise((resolve, reject) => {
            exec(execQuery, (err, stdout, stderr) => {
                if (err) { reject(err); }
                resolve(stdout);
            });
        });

        const parsed = JSON.parse(<string>result);

        const exists = parsed.toString() !== 'false';

        return {
            status : exists ? 200                        : 404,
            data   : exists ? JSON.parse(<string>result) : null,
        };
    }
}

module.exports = new Google;

// Path: src/module/impl/email/google.ts
