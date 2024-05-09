import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class QIP implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.IP;

    readonly minLength   : number = 7;
    readonly maxLength   : number = 15;

    // just check for x.x.x.x
    readonly regex     ? : RegExp = /^(\d{1,3}\.){3}\d{1,3}$/;
}

module.exports = new QIP;

// Path: src/module/query/qIP.ts
