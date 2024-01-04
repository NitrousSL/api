import { Category } from "@osint/category";
import { Module }   from "@osint/module";


import axios        from "axios";

export class Snapchat extends Module {

    public static readonly meta = {
        name: "snapchat",
        category: Category.Email,
        description: "Searches for information about a gmail address using ghunt."
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

            const accountCheck = '{"account_type":"bitemoji"}';


            if (data && JSON.stringify(data).includes(accountCheck)) {
                return { status: 200, data: true };
            } else {
                return { status: 400, data: null };
            } 
        } catch (error) {
            console.error("Error querying Snapchat API:", error);

            return { status: 500, data: null };
        }
    }
}

module.exports = new Snapchat ;