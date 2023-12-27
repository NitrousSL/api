import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import { exec }     from "child_process";

import path         from "path";

const ghunt = path.join(__dirname, "..", "..", "..", "..", "bin", "ghuntQuery.py");

export class Ghunt extends Module {

    public static readonly meta = {
        name: "ghunt",
        category: Category.Email,
        description: "Searches for information about a gmail address using ghunt."
    };

    constructor() { super(Ghunt.meta); }

    public async query(query: string): Promise<any> {

        let result = await new Promise((resolve, reject) => {
            exec(`python3.10 ${ghunt} ${process.env.GHUNT_CREDS} ${query}`, (err, stdout, stderr) => {
                if (err) { reject(err); }
                resolve(stdout);
            });
        });

        return { status: 200, data: JSON.parse(<string>result) };
    }
}

module.exports = new Ghunt;