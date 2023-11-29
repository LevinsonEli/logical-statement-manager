# logical-statement-manager
Logical Statement Manager is a tool for storing and operating with statements that are combined with logical operators (AND, OR etc.) for example: "A and B".

# Code Repository
[https://github.com/LevinsonEli/logical-statement-manager](https://github.com/LevinsonEli/logical-statement-manager)
# Installation
```
npm i logical-stmt-manager
```
## How to use
1. [Install](#Installation) the package
2. Import the classes (the ComparisonStatement - is optional)
```
import { LogicalStatementManager, ComparisonStatement } from 'logical-stmt-manager';
```
3. Create Statement (optional)
```
const stmt1 = new ComparisonStatement<string>({ leftOperand: 'A', operator: '=', rightOperand: 'B' });
```
4. Create LogicalStatementManager
```
const logicalStmtManager = new LogicalStatementManager<ComparisonStatement<string>>();
```
5. Add stmt1 to logicalStmtManager
```
logicalStmtManager.newStmt(stmt1);
```
You can use other operators on statements such as .andNot(), .or(), orNot(), .xor(), .xorNot()

## Examples
1. A = B
```
const logicalStmtManager = new LogicalStatementManager<ComparisonStatement<string>>();
const stmt1 = new ComparisonStatement<string>({ leftOperand: 'A', operator: '=', rightOperand: 'B' });

logicalStmtManager.newStmt(stmt1);

console.log(logicalStmtManager.toString()); // A = B
```
2. A and (B OR C)
```
const logicalStmtManager = new LogicalStatementManager<string>();

logicalStmtManager.newStmt('A').and(logicalStmtManager.newStmt('B').or('C'));

console.log(logicalStmtManager.toString()); // A and (B OR C)
```
3. (true OR false) AND (false OR true)
```
const logicalStmtManager = new LogicalStatementManager<boolean>();

logicalStmtManager.newStmt(
  logicalStmtManager.newStmt(true)
  .or(false))
.and(
  logicalStmtManager.newStmt(false)
  .or(true));

console.log(logicalStmtManager.toString()); // (true OR false) AND (false OR true)
```
<br/>
<br/>
<br/>


