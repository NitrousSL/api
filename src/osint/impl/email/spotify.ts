import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Spotify extends Module {

    public static readonly meta = {
        name: "spotify",
        category: Category.Email,
        description: "Searches for information about a gmail address using spotify."
    };

    constructor() { super(Spotify.meta); }

    public async query(query: string): Promise<any> {
        try {
            const response = await axios.post('https://spclient.wg.spotify.com/signup/public/v1/account?validate=1&email=' + encodeURIComponent(query));
            const data = response.data;

            if (data.status === 20 && data.errors && data.errors.email) {
                return { status: 200, data: true, message: data.errors.email };
            } else {
                return { status: 200, data: false, message: "Email not registered with Spotify." };
            }
        } catch (error: any) {
            console.error("Error querying Spotify API:", error);
            return { status: error.response ? error.response.status : 500, data: null };
        }
    }
}

module.exports = new Spotify ;
