
import ComparisonStatement from "./ComparisonStatement";
import LogicalStatementManager from "./LogicalStatementManager";


const stmtManager = new LogicalStatementManager<ComparisonStatement<string>>();
const stmt1 = new ComparisonStatement<string>({ leftOperand: 'A', operator: '=', rightOperand: 'A' });
const stmt2 = new ComparisonStatement<string>({ leftOperand: 'B', operator: '=', rightOperand: 'B' });

stmtManager.newStmt(
    stmtManager.newStmt(
        stmtManager.newStmt(
            stmtManager.newStmt(stmt1))))
    .and(stmt2);

console.log(stmtManager.toString()); // (((A = A))) AND B = B