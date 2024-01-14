# nitrous-oxi.de OSINT API
fastify/typescript [osint api](https://api.nitrous-oxi.de/) for basic reconnaissance

# Usage

## Module Indexing

All modules can be indexed via the following endpoints (no query):

`https://api.nitrous-oxi.de/`  
`https://api.nitrous-oxi.de/<queryType>`

## Individual Modules

A single module can be queried via the following endpoint:

`https://api.nitrous-oxi.de/<queryType>/<module>?query=`

## Query Types:

All modules within a category can be queried via the following endpoints:

`https://api.nitrous-oxi.de/<queryType>?query=`

- [`/username`](https://api.nitrous-oxi.de/username)
- [`/domain`](https://api.nitrous-oxi.de/domain)
- [`/email`](https://api.nitrous-oxi.de/email)
- [`/phone`](https://api.nitrous-oxi.de/phone)
- [`/ip`](https://api.nitrous-oxi.de/ip)

## Response Schema

```json
{
  "status" : 200  || 404,
  "data"   : data || null,
}
```

# Development

# Getting Started Locally
```bash
git clone https://github.com/NitrousOSINT/api.git
npm install
npm run build
npm run start
```

## ModuleCategory Enum

found in `src/sdk/enum/eModuleCategory.ts`  

```typescript
export enum ModuleCategory {
    Username = 'username',
    Phone    = 'phone',
    Email    = 'email',
    IP       = 'ip',
    Domain   = 'domain',
}
```

Each module must be assigned a category, which describes its required input.

## ModuleType Enum

found in `src/sdk/enum/eModuleType.ts`  

```typescript
export enum ModuleType {
    Information = 'information',
    Existence   = 'existence',
}
```

Each module must be assigned a type, which is used to describe the date returned.

## ModuleMeta Interface

found in `src/sdk/interface/iModuleMeta.ts`  

```typescript
export interface ModuleMeta {
    name        : string;
    description : string;

    category    : ModuleCategory;
    type        : ModuleType;
}
```

Each module must be assigned metadata, which is used for indexing.

## Module Superclass

found in `src/module/module.ts`  

```typescript
export class Module {

    public meta: ModuleMeta;

    constructor(meta: ModuleMeta) { this.meta = meta; }

    public async query(query: string): Promise<any> { throw new Error("Method not implemented."); }
}
```

Every module has a set metadata, and must implement the `query` method, which returns a promise of the module's result.

## In Practice

found in `src/module/impl/username/cashapp.ts`  

```typescript
import { ModuleCategory } from "@enum/eModuleCategory";
import { ModuleType }     from "@enum/eModuleType";

import { ModuleMeta }     from "@interface/iModuleMeta";

import { Module }         from "@module/module";

import axios              from "axios";

// define our module's metadata
const META: ModuleMeta = {
    name        : "cashapp",
    description : "Searches for CashApp profile info based on a given username.",

    category    : ModuleCategory.Username,
    type        : ModuleType.Information,
}

// create a new class extending our Module superclass
export class CashApp extends Module {

    // construct our class using our metadata
    constructor() { super(META); }

    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://cash.app/$${query}`);

        const exists = response.data.includes('var profile =');

        // parse the response, and return data which is then sent to the client
        return {
            status : exists ? 200                                                                : 404,
            data   : exists ? JSON.parse(response.data.split('var profile = ')[1].split(';')[0]) : null,
        }
    }
}

// export a new instance of our module class
module.exports = new CashApp;
```
