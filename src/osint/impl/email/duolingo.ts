import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Duolingo extends Module {
    public static readonly meta = {
        name: "duolingo",
        category: Category.Email,
<<<<<<< HEAD
        description: "Searches for information about a gmail address using duolingo.",
=======
        description: "Searches for information about an email address using duolingo."
    };
>>>>>>> 54fb165e1b2ae2309de4c79557e3f2cfd1c91266

    constructor() { super(Duolingo.meta); }

    public async query(email: string): Promise<any> {
        try {
            const headers = {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
            };

            const response = await axios.get('https://www.duolingo.com/2017-06-30/users', { params: { email }, headers });

            const data = response.data;

            if (data && data.users && data.users.length > 0) {
                let result = {
                    name: data.users[0].name || 'N/A',
                    hasAccount: 'username' in data.users[0],
                    picture: data.users[0].picture || 'N/A'
                };
                return { status: 200, data: result };
            } else {
                return { status: 400, data: null };
            }
        } catch (error) {
            console.error("Error querying Duolingo API:", error);

            return { status: 500, data: null };
        }
    }
}

module.exports = new Duolingo ;
