import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class MeWe extends Module {

    public static readonly meta = {
        name: "mewe",
        category: Category.Email,
        description: "Searches for information about a gmail address using MeWe."
    };

    constructor() { super(MeWe.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.get(`https://mewe.com/api/v2/auth/checkEmail?email=${encodeURIComponent(query)}`);
            const data = response.data;

            if (data && data.errorCode === 109) {
                return { status: 200, data: true, message: data.message };
            } else {
                return { status: 200, data: false, message: "Email not registered with MeWe." };
            }
        } catch (error: any) {
            console.error("Error querying MeWe API:", error);
            return { status: error.response ? error.response.status : 500, data: null };
        }
    }
}

module.exports = new MeWe;
