import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class WordPress extends Module {

    public static readonly meta = {
        name: "wordpress",
        category: Category.Email,
        description: "Checks if an email address is associated with a WordPress account."
    };

    constructor() { super(WordPress.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://public-api.wordpress.com/rest/v1.1/users/${encodeURIComponent(query)}/auth-options?http_envelope=1`);
            const data = response.data;

            if (data.code === 404 && data.body && data.body.error === "unknown_user") {
                return { status: 200, data: false, message: "User does not exist." };
            } else {
                return { status: 200, data: true, message: "User exists." };
            }
        } catch (error: any) {
            console.error("Error querying WordPress API:", error);
            return { status: error.response ? error.response.status : 500, data: null };
        }
    }
}

module.exports = new WordPress;