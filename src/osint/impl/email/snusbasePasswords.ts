import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

export class SnusbasePasswords extends Module {

    public static readonly meta = {
        name: "snusbase-passwords",
        category: Category.Email,
        description: "Searches the Snusbase API v2 for passwords associated with a given email address."
    };

    constructor() { super(SnusbasePasswords.meta); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://beta.snusbase.com/v2/combo/${query}`);

        if (response.data.size === 0) { return { status: 404, data: null }; }

        let passwords: string[] = [];

        Object.keys(response.data.result).forEach((key: string) => {
            response.data.result[key].forEach((entry: any) => {
                passwords.push(entry.password);
            });
        });

        return { status: 200, data: passwords };
    }
}

module.exports = new SnusbasePasswords;