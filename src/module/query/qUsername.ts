import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class QUsername implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Username;

    readonly minLength   : number = 3;
    readonly maxLength   : number = 255;

    // no regex for usernames
}

module.exports = new QUsername;

// Path: src/module/query/qUsername.ts
