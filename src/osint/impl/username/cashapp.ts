import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

export class CashApp extends Module {

    public static readonly meta = {
        name        : "cashapp",
        category    : Category.Username,
        description : "Searches for a given username on CashApp."
    };

    constructor() { super(CashApp.meta); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://cash.app/$${query}`);

        if (response.data === '') { return { status: 404, data: null }; }

        if (response.data.includes('var profile =')) {

            return {
                status: 200,
                data: JSON.parse(response.data.split('var profile = ')[1].split(';')[0])
            }
        }
    }
}

module.exports = new CashApp;