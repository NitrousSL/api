import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class QEmail implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Email;

    readonly minLength   : number = 5;
    readonly maxLength   : number = 255;

    // just check for x@x.x, not validation, only standardization
    readonly regex     ? : RegExp = /^.+@.+\..+$/
}

module.exports = new QEmail;

// Path: src/module/query/qEmail.ts
