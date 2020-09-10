const antlr4 = require('antlr4');
const ECMAScriptLexer = require('../lib/ECMAScriptLexer.js');
const ECMAScriptParser = require('../lib/ECMAScriptParser.js');
const PythonGenerator = require("./codegeneration/PythonGenerator");
const fs = require('fs');
const util = require('util');

const input = '{x: 1}';

const chars = new antlr4.InputStream(input);
const lexer = new ECMAScriptLexer.ECMAScriptLexer(chars);

lexer.strictMode = false; // не использовать JavaScript strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ECMAScriptParser.ECMAScriptParser(tokens);
const tree = parser.program();

// console.log(tree.toStringTree(parser.ruleNames));

console.log('JavaScript input:');
console.log(input);
console.log('Python output:');

const output = new PythonGenerator().start(tree);

fs.open('dist/output.txt', 'w', (err, fd) => {

    fs.write(fd, output);
    fs.close(fd);
});

console.log( new PythonGenerator().visitTerminal(tree));
console.log(output);