import { Category } from "@osint/category";
import { Module } from "@osint/module";
import axios from "axios";

export class GitHub extends Module {

    public static readonly meta = {
        name: "github",
        category: Category.Username,
        description: "Searches for a given username on Github."
    };

    constructor() { super(GitHub.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://api.github.com/users/${encodeURIComponent(query)}`);
            const data = response.data;

            if (data && data.login) {
                return { status: 200, data: true, message: "GitHub user exists.", userDetails: data };
            } else {
                return { status: 200, data: false, message: "GitHub user does not exist." };
            }
        } catch (error) {
            console.error("Error querying GitHub API:", error);
            if ((error as any).response && (error as any).response.status === 404) {
                return { status: 404, data: false, message: "GitHub user does not exist." };
            }
            return { status: 500, data: null };
        }
    }
}

module.exports = new GitHub;