import {Validator} from "../models/BaseClasses";
import {MissingParameterError} from "../models/Errors";

export class ShouldBePresent implements Validator {
    key: string;
    value: any;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }

    async orThrow() {
        let isEmpty = false;

        if (this.value == null) {
            isEmpty = true;
        } else if (Array.isArray(this.value)) {
            isEmpty = this.value.length === 0;
        } else if (typeof this.value === "object") {
            isEmpty = Object.keys(this.value).length === 0;
        } else if (typeof this.value === "string") {
            isEmpty = this.value.trim() === '' || this.value === 'null' || this.value === 'undefined';
        } else if (typeof this.value === "number") {
            isEmpty = this.value === 0;
        }

        if (isEmpty) {
            throw new MissingParameterError(`Parameter ${this.key} is missing`);
        }
    }
}
