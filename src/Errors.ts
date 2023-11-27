
export default class Errors {

    public static readonly CannotStartMethodWithAnd = 'Can not start new statement with .and().';

    public static throwError(msg: string): never {
        throw new Error(msg);
    }

    public static throwCannotStartMethodWithAnd(): never {
        Errors.throwError(Errors.CannotStartMethodWithAnd);
    }
}