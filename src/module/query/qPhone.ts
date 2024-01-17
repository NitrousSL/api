import IQueryStandardization from "@interface/iQueryStandardization";
import { ModuleCategory }    from "@enum/eModuleCategory";

export default class QPhone implements IQueryStandardization {

    readonly category    : ModuleCategory = ModuleCategory.Phone;

    readonly minLength   : number = 5;
    readonly maxLength   : number = 255;

    // e164 format +1 123 456 7890 (no spaces, plus sign, or dashes)
    readonly regex     ? : RegExp = /^\+?[0-9]{1,3}[0-9]{3}[0-9]{3}[0-9]{4}$/;
}

module.exports = new QPhone;

// Path: src/module/query/qPhone.ts
