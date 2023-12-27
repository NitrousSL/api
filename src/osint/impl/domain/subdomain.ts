import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

export class Subdomain extends Module {

    public static readonly meta = {
        name: "subdomain",
        category: Category.Domain,
        description: "Searches for subdomains for a given domain name."
    };

    constructor() { super(Subdomain.meta); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://crt.sh/?q=${query}`)

        const subs = response.data.split('<TD>')[5].split('</TD>')[0].split('<BR>');

        if (subs.length === 0) { return { status: 404, data: null }; }

        return { status: 200, data: subs };
    }
}

module.exports = new Subdomain;