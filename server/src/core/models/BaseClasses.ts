export abstract class BaseProcessor<T> {
    async execute(): Promise<T> {
        await this.validate();

        return this.process();
    }

    abstract validate(): Promise<void>;
    abstract process(): Promise<T>;
}

export interface Validator {
    orThrow(): Promise<void>;
}
