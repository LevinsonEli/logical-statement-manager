

export interface IComparisonStatement<T> {
    leftOperand: T;
    operator: string;
    rightOperand: T;
}


export default class ComparisonStatement<T> implements IComparisonStatement<T> {
    public _leftOperand: T;
    public _operator: string;
    public _rightOperand: T;

    constructor(stmtArgs: IComparisonStatement<T>) {
        this._leftOperand = stmtArgs.leftOperand;
        this._operator = stmtArgs.operator;
        this._rightOperand = stmtArgs.rightOperand;
    }

    public get leftOperand(): T {
        return this._leftOperand;
    }

    public get operator(): string {
        return this._operator;
    }

    public get rightOperand(): T {
        return this._rightOperand;
    }

    public toString(): string {
        return `${this.leftOperand} ${this.operator} ${this.rightOperand}`;
    }
}
