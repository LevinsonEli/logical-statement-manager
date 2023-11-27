
import LogicalStatementManager from "../src/LogicalStatementManager";
import Errors from '../src/Errors';

describe('Logical Statement Manager unit tests', () => {

    const stmt1 = 'A';
    const stmt2 = 'B';
    const stmt3 = 'C';
    const stmt4 = 'D';

    const stmtManager = new LogicalStatementManager<string>();

    it('Creates new stmt on .newStmt() call.', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1);

        expect(stmtManager.statementsStack.length).toBe(1);
        expect(stmtManager.statementsStack[0]).toBe(stmt1);
    });

    it('Cleans the stack on .clean() call.', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1);
        stmtManager.clean();

        expect(stmtManager.statementsStack.length).toBe(0);
    });

    it('Puts stmt into brackets on .newStmt() call.', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmtManager.newStmt(stmt1));

        expect(stmtManager.statementsStack.length).toBe(3);
        expect(stmtManager.statementsStack[0]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[1]).toBe(stmt1);
        expect(stmtManager.statementsStack[2]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
    });

    it('Does not allow to start stmt with .and().', () => {
        stmtManager.clean();

        expect(() => stmtManager.and(stmt1)).toThrow(Errors.CannotStartMethodWithAnd);
    });

    it('Does not allow to start stmt with .and() and nested .newStmt.', () => {
        stmtManager.clean();

        expect(() => stmtManager.and(stmtManager.and(stmt1))).toThrow(Errors.CannotStartMethodWithAnd);
    });

    it('Creates stmt with logical operator .and().', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1).and(stmt2);

        expect(stmtManager.statementsStack.length).toBe(3);
        expect(stmtManager.statementsStack[0]).toBe(stmt1);
        expect(stmtManager.statementsStack[1]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[2]).toBe(stmt2);
    });

    it('Puts stmt that is inside .and() into brackets.', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1).and(stmtManager.newStmt(stmt2));

        expect(stmtManager.statementsStack.length).toBe(5);
        expect(stmtManager.statementsStack[0]).toBe(stmt1);
        expect(stmtManager.statementsStack[1]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[2]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[3]).toBe(stmt2);
        expect(stmtManager.statementsStack[4]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
    });

    it('Puts stmt inside .newStmt() that followed by .and() into brackets.', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmtManager.newStmt(stmt1)).and(stmt2);

        expect(stmtManager.statementsStack.length).toBe(5);
        expect(stmtManager.statementsStack[0]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[1]).toBe(stmt1);
        expect(stmtManager.statementsStack[2]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
        expect(stmtManager.statementsStack[3]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[4]).toBe(stmt2);
    });

    it('Puts stmts into brackets that are inside stmts .newStmt() followed by .and().', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmtManager.newStmt(stmt1)).and(stmtManager.newStmt(stmt2));

        expect(stmtManager.statementsStack.length).toBe(7);
        expect(stmtManager.statementsStack[0]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[1]).toBe(stmt1);
        expect(stmtManager.statementsStack[2]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
        expect(stmtManager.statementsStack[3]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[4]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[5]).toBe(stmt2);
        expect(stmtManager.statementsStack[6]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
    });

    it('Puts stmt into brackets that is between .newStmt() and .and().', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1).and(stmtManager.newStmt(stmt2)).and(stmt3);

        expect(stmtManager.statementsStack.length).toBe(7);
        expect(stmtManager.statementsStack[0]).toBe(stmt1);
        expect(stmtManager.statementsStack[1]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[2]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[3]).toBe(stmt2);
        expect(stmtManager.statementsStack[4]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
        expect(stmtManager.statementsStack[5]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[6]).toBe(stmt3);
    });

    it('Puts stmt into brackets that is between .and() and .and().', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1).and(stmt2).and(stmtManager.newStmt(stmt3)).and(stmt4);

        expect(stmtManager.statementsStack.length).toBe(9);
        expect(stmtManager.statementsStack[0]).toBe(stmt1);
        expect(stmtManager.statementsStack[1]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[2]).toBe(stmt2);
        expect(stmtManager.statementsStack[3]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[4]).toBe(LogicalStatementManager.BRACKETS.OPEN);
        expect(stmtManager.statementsStack[5]).toBe(stmt3);
        expect(stmtManager.statementsStack[6]).toBe(LogicalStatementManager.BRACKETS.CLOSE);
        expect(stmtManager.statementsStack[7]).toBe(LogicalStatementManager.LOGICAL_OPERATORS.AND);
        expect(stmtManager.statementsStack[8]).toBe(stmt4);
    });

    it('Prints the stmt as expected string on .toString() call.', () => {
        stmtManager.clean();
        stmtManager.newStmt(stmt1).and(stmtManager.newStmt(stmt2));

        expect(stmtManager.toString()).toBe(`${stmt1.toString()} ${LogicalStatementManager.LOGICAL_OPERATORS.AND} ${LogicalStatementManager.BRACKETS.OPEN}${stmt2.toString()}${LogicalStatementManager.BRACKETS.CLOSE}`);
    });
});