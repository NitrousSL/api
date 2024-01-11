import { Category } from "@osint/category";
import { Module }   from "@osint/module";
import axios        from "axios";

export class Discord extends Module {

    public static readonly meta = {
        name: "discord",
        category: Category.Email,
        description: "Checks if an email is registered on Discord."
    };

    constructor() { super(Discord.meta); }

    public async query(email: string): Promise<any> {
        try {
            
            const headers = {
                'User-Agent:': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'Accept-Language': 'en-US',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/json',
                'X-Super-Properties': 'eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6ImVuLVVTIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiYnJvd3Nlcl92ZXJzaW9uIjoiMTIwLjAuMC4wIiwib3NfdmVyc2lvbiI6IjEwIiwicmVmZXJyZXIiOiIiLCJyZWZlcnJpbmdfZG9tYWluIjoiIiwicmVmZXJyZXJfY3VycmVudCI6IiIsInJlZmVycmluZ19kb21haW5fY3VycmVudCI6IiIsInJlbGVhc2VfY2hhbm5lbCI6InN0YWJsZSIsImNsaWVudF9idWlsZF9udW1iZXIiOjI1ODU3NCwiY2xpZW50X2V2ZW50X3NvdXJjZSI6bnVsbH0=',
                'X-Fingerprint': '1194901133727105047.zeU4XGXLWvgzBKkXYOgl16Un9xw',
                'X-Discord-Locale': 'en-US',
                'X-Debug-Options': 'bugReporterEnabled',
                'Origin': 'https://discord.com',
                'Alt-Used': 'discord.com',
                'Connection': 'keep-alive',
                'Referer': 'https://discord.com/register',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache',
                'TE': 'trailers',
                'Cookie': '__dcfduid=80cf3700b05011ee9625f194c18da211; __sdcfduid=80cf3701b05011ee9625f194c18da21128f4521feaa0386dbc436754b00367504ee485f519f0d537c2fb1e7d1a5983ab; __cfruid=fc284ac3dfbb0223c70cd44996d9b2dd8a0d9def-1704957030; _cfuvid=0IlmCvDfUAzu8jLENIK6A4L4ZPf5gwALaxXSsiKGg2o-1704957030004-0-604800000; cf_clearance=yIW9oSfPdcrRr2zXGaDReCgnS0muhvBy1w4wEmgcHYg-1704957030-0-2-9526389f.7b2b67e6.5a1c6eec-0.2.1704957030; locale=en-US; _gcl_au=1.1.1653814272.1704957031; OptanonConsent=isIABGlobal=false&datestamp=Wed+Jan+10+2024+23%3A10%3A30+GMT-0800+(Pacific+Standard+Time)&version=6.33.0&hosts=&landingPath=https%3A%2F%2Fdiscord.com%2F&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1; _ga_Q149DFWHT7=GS1.1.1704957030.1.0.1704957030.0.0.0; _ga=GA1.1.1049490310.1704957031                '
            };

            const json_data = {
                'fingerprint': '1194901133727105047.zeU4XGXLWvgzBKkXYOgl16Un9xw',
                'email': email,
                'global_name': 'asdfasdfasdf',
                'username': 'osintlolcool123',
                'password': 'Lolokcoolpassword!123',
                'invite': null,
                'consent': true,
                'date_of_birth': '1996-05-05',
                'gift_code_sku_id': null,
                'captcha_key': null,
            };

            const response = await axios.post('https://discord.com/api/v9/auth/register', json_data, { headers });

            const html = response.data;

            const taken = 'Email is already registered.';

            if (html.includes(taken)) {
                return { status: 200, data: true };
            } else {
                return { status: 400, data: false };
            }
        } catch (error) {
            console.error("Error querying Discord API:", error);
            return { status: 500, data: null };
        }
    }
}

module.exports = new Discord ;
