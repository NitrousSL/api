import { Category } from "@osint/category";
import { Module } from "@osint/module";
import axios from "axios";

export class Snapchat extends Module {

    public static readonly meta = {
        name: "snapchat",
        category: Category.Email,
<<<<<<< HEAD
        description: "Searches for information about a gmail address using snapchat."
=======
        description: "Searches for information about an email address using Snapchat."
>>>>>>> 54fb165e1b2ae2309de4c79557e3f2cfd1c91266
    };

    constructor() { super(Snapchat.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.post('https://bitmoji.api.snapchat.com/api/user/find', 
                { 
                    email: query,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            const data = response.data;
            const accountCheck = '{"account_type": "bitmoji"}';

<<<<<<< HEAD
            const accountCheck = '{"account_type":"bitmoji"}';


            if (data && JSON.stringify(data).includes(accountCheck)) {
                return { status: 200, data: true };
            } else {
                return { status: 400, data: null };
            } 
=======
            return { 
                status: 200, 
                data: data && JSON.stringify(data).includes(accountCheck)
            };
>>>>>>> 54fb165e1b2ae2309de4c79557e3f2cfd1c91266
        } catch (error) {
            console.error("Error querying Snapchat API:", error);
            if (error.response && error.response.status === 404) {
                return { status: 404, data: null, message: "This email is not registered to snapchat." };
            }
            return { status: 500, data: null };
        }
    }
}

module.exports = new Snapchat ;
