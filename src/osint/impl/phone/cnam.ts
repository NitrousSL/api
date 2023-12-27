import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

export class CNAM extends Module {

    public static readonly meta = {
        name: "cnam",
        category: Category.Phone,
        description: "Searches for a name and location (CNAM) for a given phone number."
    };

    constructor() { super(CNAM.meta); }

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

        if (!response.data) { return { status: 404, data: null }; }

        return { status: 200, data: response.data };
    }
}

module.exports = new CNAM;