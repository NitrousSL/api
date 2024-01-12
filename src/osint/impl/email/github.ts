import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Github extends Module {

    public static readonly meta = {
        name: "github",
        category: Category.Username,
        description: "Searches for information about a gmail address using github."
    };

    constructor() { super(Github.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
            const data = response.data;

            if (data && data.items && data.items.length > 0) {
                return { status: 200, data: data.items, message: "GitHub users found." };
            } else {
                return { status: 200, data: [], message: "No GitHub users found." };
            }
        } catch (error: any) {
            console.error("Error querying GitHub API:", error);
            return { status: error.response ? error.response.status : 500, data: null };
        }
    }
}

module.exports = new Github;
