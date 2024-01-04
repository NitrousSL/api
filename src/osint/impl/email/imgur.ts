import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Imgur extends Module {

    public static readonly meta = {
        name: "imgur",
        category: Category.Email,
        description: "Checks if an email is registered on Imgur."
    };

    constructor() { super(Imgur.meta); }

    public async query(email: string): Promise<any> {
        try {
            const headers = {
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            };

            const data = `email=${encodeURIComponent(email)}`;

            const response = await axios.post('https://imgur.com/signin/ajax_email_available', data, { headers });

            const checker = response.data;

            const text = '{"data":{"available":false},"success":true,"status":200}';

            if (text in checker) {
                return { status: 200, data: true }; // Email is registered
            } else {
                return { status: 400, data: false }; // Email is not registered
            }
        } catch (error) {
            console.error("Error querying Imgur API:", error);
            return { status: 500, data: null };
        }
    }
}

module.exports = new Imgur ;