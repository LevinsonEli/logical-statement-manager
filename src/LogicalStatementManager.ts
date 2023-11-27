
import Errors from './Errors';

export default class LogicalStatementManager<T> {
    private _statementsStack: Array<T | string>;
    
    public static readonly LOGICAL_OPERATORS = {
        AND: 'AND',
        AND_NOT: 'AND NOT',
        OR: 'OR',
        OR_NOT: 'OR NOT',
        XOR: 'XOR',
        XOR_NOT: 'XOR NOT',
    }

    public static readonly BRACKETS = {
        OPEN: '(',
        CLOSE: ')',
    }

    constructor() {
        this._statementsStack = [];
    }

    public get statementsStack(): Array<T | string> {
        return this._statementsStack;
    }

    public newStmt(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        return this.logicalOperate(undefined, stmtArgs);
    }

    public and(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        this.checkAddingLogicOperatorEligibility();
        return this.logicalOperate(LogicalStatementManager.LOGICAL_OPERATORS.AND, stmtArgs);
    }

    public andNot(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        this.checkAddingLogicOperatorEligibility();
        return this.logicalOperate(LogicalStatementManager.LOGICAL_OPERATORS.AND_NOT, stmtArgs);
    }

    public or(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        this.checkAddingLogicOperatorEligibility();
        return this.logicalOperate(LogicalStatementManager.LOGICAL_OPERATORS.OR, stmtArgs);
    }

    public orNot(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        this.checkAddingLogicOperatorEligibility();
        return this.logicalOperate(LogicalStatementManager.LOGICAL_OPERATORS.OR_NOT, stmtArgs);
    }

    public xor(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        this.checkAddingLogicOperatorEligibility();
        return this.logicalOperate(LogicalStatementManager.LOGICAL_OPERATORS.XOR, stmtArgs);
    }

    public xorNot(stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {
        this.checkAddingLogicOperatorEligibility();
        return this.logicalOperate(LogicalStatementManager.LOGICAL_OPERATORS.XOR_NOT, stmtArgs);
    }

    private logicalOperate(logicalOperator: string | undefined, stmtArgs: T | LogicalStatementManager<T>): LogicalStatementManager<T> {

        if (stmtArgs instanceof LogicalStatementManager)
            this.wrapLastStmtWithBrackets(logicalOperator);
        else {
            this.statementOperate(logicalOperator, stmtArgs);
        }

        return this;
    }

    private statementOperate(logicalOperator: string | undefined, stmtArgs: T): LogicalStatementManager<T> {

        if (logicalOperator)
            this._statementsStack.push(logicalOperator);
        this._statementsStack.push(stmtArgs);

        return this;
    }

    private getStartingStatementIndex(): number | null {
        if (this._statementsStack.length === 0)
            return null;
        let i = this._statementsStack.length - 1;
        do {
            // two statements without operator between [ ...A B... ]
            if (this.isInstanceOfT(this._statementsStack[i])
                && this.isInstanceOfT(this._statementsStack[i - 1]))
                break;
            //  brecket opens, brecket closes [ ...) (... ]
            if (this._statementsStack[i] === LogicalStatementManager.BRACKETS.OPEN
                && this._statementsStack[i - 1] === LogicalStatementManager.BRACKETS.CLOSE)
                break;
            // statement and bracket without operator between [ ...A (...]
            if (this._statementsStack[i] === LogicalStatementManager.BRACKETS.OPEN
                && this.isInstanceOfT(this._statementsStack[i - 1]))
                break;
            // closed brecket and statement [ ...) A...]
            if (this.isInstanceOfT(this._statementsStack[i])
                && this._statementsStack[i - 1] === LogicalStatementManager.BRACKETS.CLOSE)
                break;
            i--;
        } while (i > 0);

        return i;
    }

    private isInstanceOfT(value: T | string): boolean {
        if (typeof value !== 'string')
            return true;
        return (Object.values(LogicalStatementManager.LOGICAL_OPERATORS).indexOf(String(value)) === -1
            && Object.values(LogicalStatementManager.BRACKETS).indexOf(String(value)) === -1)
    }

    private wrapLastStmtWithBrackets(logicalOperator: string | undefined): void {

        const startStmtInx = this.getStartingStatementIndex();
        if (logicalOperator && !startStmtInx)
            Errors.throwCannotStartMethodWithAnd();
        if (startStmtInx === null) return;

        if (logicalOperator) {
            this._statementsStack.splice(startStmtInx, 0, logicalOperator, LogicalStatementManager.BRACKETS.OPEN);
        } else
            this._statementsStack.splice(startStmtInx, 0, LogicalStatementManager.BRACKETS.OPEN);
        this._statementsStack.push(LogicalStatementManager.BRACKETS.CLOSE);
    }

    private checkAddingLogicOperatorEligibility(): boolean {
        if (this.statementsStack.length === 0)
            Errors.throwCannotStartMethodWithAnd();
        return true;
    }

    public clean(): void {
        this._statementsStack = [];
    }

    public toString(): string {
        return this._statementsStack.reduce((accum, cur) => {
            if (Object.values(LogicalStatementManager.LOGICAL_OPERATORS).indexOf(String(cur)) === -1)
                accum += String(cur);
            else 
                accum += ` ${cur} `;
            return accum;
        }, '') as string;
    }
}
