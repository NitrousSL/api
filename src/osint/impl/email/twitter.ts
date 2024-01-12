import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Twitter extends Module {

    public static readonly meta = {
        name: "twitter",
        category: Category.Email,
        description: "Searches for information about a gmail address using twitter."
    };

    constructor() { super(Twitter.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://api.twitter.com/i/users/email_available.json?email=${encodeURIComponent(query)}`);
            const data = response.data;

            if (data && data.taken) {
                return { status: 200, data: true, message: data.msg };
            } else {
                return { status: 200, data: false, message: "Email not registered with Twitter." };
            }
        } catch (error: any) {
            console.error("Error querying Twitter API:", error);
            return { status: error.response ? error.response.status : 500, data: null };
        }
    }
}

module.exports = new Twitter;
