import _ from "lodash";

export default class BaseState {
    clone(): this {
        return _.cloneDeep(this);
    }
}
