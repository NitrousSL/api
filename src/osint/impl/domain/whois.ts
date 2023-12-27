import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

export class WhoIs extends Module {

    public static readonly meta = {
        name: "whois",
        category: Category.Domain,
        description: "Searches for WhoIs information for a given domain."
    };

    constructor() { super(WhoIs.meta); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://api.api-ninjas.com/v1/whois?domain=${query}`, {
            headers: {
                'X-Api-Key': process.env.API_NINJAS_KEY as string
            }
        });

        if (response.data === '') { return { status: 404, data: null }; }

        return { status: 200, data: response.data };
    }
}

module.exports = new WhoIs;