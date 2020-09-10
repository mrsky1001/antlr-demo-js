const antlr4 = require('antlr4');
const ECMAScriptLexer = require('../lib/ECMAScriptLexer.js');
const ECMAScriptParser = require('../lib/ECMAScriptParser.js');
const PythonGenerator = require("./codegeneration/PythonGenerator");
const ErrorListener = require('./codegeneration/ErrorListener.js');
const fs = require('fs');
const util = require('util');

const input = '{x: 2}';

const chars = new antlr4.InputStream(input);
const lexer = new ECMAScriptLexer.ECMAScriptLexer(chars);

lexer.strictMode = false; // не использовать JavaScript strictMode

const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ECMAScriptParser.ECMAScriptParser(tokens);
const listener = new ErrorListener();

parser.removeErrorListeners();
parser.addErrorListener(listener);

console.log('JavaScript input:');
console.log(input);
console.log('Python output:');

try {
    const tree = parser.expressionSequence();
    const output = new PythonGenerator().start(tree);

    console.log(output);

    fs.open('dist/output.txt', 'w', (err, fd) => {

        fs.write(fd, output);
        fs.close(fd);
    });

    // console.log(tree.toStringTree(parser.ruleNames));
} catch (error) {
    console.log(error);
}

