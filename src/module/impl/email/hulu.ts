import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

const META: ModuleMeta = {
    name        : "hulu",
    description : "Searches for Hulu profile existence based on a given email.",

    category    : ModuleCategory.Email,
    type        : ModuleType.Existence,
}

export class Hulu extends Module {

    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://signup.hulu.com/api/v3/accounts/status?email=${query}`, {
            headers: {
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'en-US,en;q=0.9',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                'cookie': '_suf_id=a933d964-85d8-4b70-a6a6-75867db12549; ak_bmsc=DC1EFD4CF88E66CC98305ECA29585BB9~000000000000000000000000000000~YAAQy6XcF+mpA+6MAQAAK2ZVChbpDgvRB+62bEXprREl3jc9fuufg3Wal+UTZhhJCGLS3/iT5BJexnBdDoyME5AnnFAb83Lk+wp89uCzAMpRpVO82/KRHXUjhGMivpWvB+mIiwcLht3BXxbEwRNG9CBPpFqPo+ZoIDrG5RxmLfPwmtefxYVv+EZAPE3Z3smv+J5+6LLUDQmsytp9k0OMW+RyfT4+FE0Cs79jCTIZ0FhZgKoghGZtbdzpsHrtLl3hSRLhFHc9NG4NrzXrr38Jmuxa6pFOkC8sPqTrn93oPQXNKAP9SkPznnDlvMAd7Jd1xJN98fFdvRebbrGL8RC1R3ysRGbXvQSaE5hoclqJ0B+G4rB91Q4kSjBzfsUy; bm_sv=0AD71176D28D90E2FD62C627AD421E25~YAAQGabcF3x5qu2MAQAAC1hmChbhHQNhK8wJEpC8Gn6ZVLzHDYgc0CHLRaaBQU0Rxi2xZvvbzGuwA/yWSmqDCymq56P/+qRg0h/Gwbw/2AClmuxM77UEEOEI4cDL1nueJTt9XBRee8CHVFUTIR82aroFZ5vKuKPk+g75il9No5IlEYqaHCo9IpsS+2xeiB6eiEKWNOwrdNgKKO3n9XA2UjXsjZXlAaxbJtfcgusTr/coscFzjL7o4CRWjovc9Q==~1'
            }
        });

        const exists = response.data.status === 'existing';

        return {
            status : exists ? 200  : 404,
            data   : exists ? true : null,
        }
    }
}

module.exports = new Hulu;

// Path: src/module/impl/email/hulu.ts
