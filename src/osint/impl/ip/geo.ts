import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

export class Geo extends Module {

    public static readonly meta = {
        name: "geo",
        category: Category.IP,
        description: "Searches for a location for a given IP address."
    };

    constructor() { super(Geo.meta); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://ipapi.co/${query}/json/`)

        if (response.data === '') { return { status: 404, data: null }; }

        return { status: 200, data: response.data };
    }
}

module.exports = new Geo;