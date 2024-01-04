import { Category } from "@osint/category";
import { Module }   from "@osint/module";


import axios        from "axios";

export class Hulu extends Module {

    public static readonly meta = {
        name: "hulu",
        category: Category.Email,
        description: "Searches for information about a gmail address using hulu."
    };

    constructor() { super(Hulu.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://signup.hulu.com/api/v3/accounts/status?email=${query}`);
            const data = response.data;

            if (data && data.status && data.status === "existing") {
                return { status: 200, data: true };
            } else {
                return { status: 400, data: null };
            }
        } catch (error) {
            console.error("Error querying Hulu API:", error);

            return { status: 500, data: null };
        }
    }
}

module.exports = new Hulu ;