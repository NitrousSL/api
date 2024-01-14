# nitrous-oxi.de OSINT API
fastify/typescript osint search api for basic reconnaissance

live version: [api.nitrous-oxi.de](https://api.nitrous-oxi.de/)
  
# Getting Started
```bash
git clone https://github.com/NitrousOSINT/api.git
npm install
npm run build
npm run start
```

# Development

## Category Enum

found in `src/osint/category.ts`  

```typescript
export enum Category {
    Username = 'username',
    Phone    = 'phone',
    Email    = 'email',
    IP       = 'ip',
    Domain   = 'domain',
}
```

Each module is registered to a category and can be accessed via the category enum, router defers indexing by category as well.

## Module Interface

found in `src/osint/module.ts`  

```typescript
export class Module {

    public name          : string;
    public description   : string;

    public category      : Category;

    constructor(meta: any) {

        this.name        = meta.name;
        this.description = meta.description;
        this.category    = meta.category;
    }

    public async query(query: string): Promise<any> { throw new Error("Method not implemented."); }
}
```

Every module has a set metadata, and must implement the `query` method, which returns a promise of the module's result.

## In Practice

found in `src/osint/impl/username/cashapp.ts`  

```typescript
import { Category } from "@osint/category";
import { Module }   from "@osint/module";

import axios        from "axios";

// create a new class extending our Module superclass
export class CashApp extends Module {

    // define the metadata for our module
    public static readonly meta = {
        name: "cashapp",
        category: Category.Username,
        description: "Searches for a given username on CashApp."
    };

    // call the superclass constructor with our metadata
    constructor() { super(CashApp.meta); }

    // implement the query method
    public async query(query: string): Promise<any> {

        const response = await axios.get(`https://cash.app/$${query}`);

        if (response.data === '') { return { status: 404, data: null }; }

        if (response.data.includes('var profile =')) {

            // parse the response, and return data which is then sent to the client
            return {
                status: 200,
                data: JSON.parse(response.data.split('var profile = ')[1].split(';')[0])
            }
        }
    }
}

// export a new instance of our module
module.exports = new CashApp;
```

# Usage

## Individual Modules

A single module can be queried via the following endpoint:

`https://api.nitrous-oxi.de/<queryType>/<module>?query=`

## Query Types:  
  
All modules within a category can be queried via the following endpoint:

`https://api.nitrous-oxi.de/<queryType>?query=`  
  
- [`/username`](https://api.nitrous-oxi.de/username)  
- [`/domain`](https://api.nitrous-oxi.de/domain)  
- [`/email`](https://api.nitrous-oxi.de/email)  
- [`/phone`](https://api.nitrous-oxi.de/phone)  
- [`/ip`](https://api.nitrous-oxi.de/ip)  
  
## Query Indexing

All modules can be indexed via the following endpoints (no query):

`https://api.nitrous-oxi.de/`  
`https://api.nitrous-oxi.de/<queryType>`


 
