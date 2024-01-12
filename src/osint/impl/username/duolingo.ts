import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Duolingo extends Module {

    public static readonly meta = {
        name: "duolingo",
        category: Category.Username,
        description: "Searches for a given username on Duolingo."
    };

    constructor() { super(Duolingo.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://www.duolingo.com/2017-06-30/users?username=${encodeURIComponent(query)}`);
            const data = response.data;

            if (data && data.users && data.users.length > 0) {
                return { status: 200, data: true, message: "Duolingo user exists.", userDetails: data.users[0] };
            } else {
                return { status: 200, data: false, message: "Duolingo user does not exist." };
            }
        } catch (error: any) {
            console.error("Error querying Duolingo API:", error);
            return { status: error.response ? error.response.status : 500, data: null };
        }
    }
}

module.exports = new Duolingo;

