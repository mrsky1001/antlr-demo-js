const ECMAScriptVisitor = require('../../lib/ECMAScriptVisitor.js').ECMAScriptVisitor;
const path = require('path');
const {
    SemanticArgumentCountMismatchError
} = require(path.resolve('src/error', 'helper'));


/**
 * Visitor проходит по дереву, сгенерированному ANTLR
 * с целью трансформировать JavaScript код в Python код
 *
 * @returns {object}
 */
class Visitor extends ECMAScriptVisitor {
    /**
     * Начальная точка обхода дерева
     *
     * @param {object} ctx
     * @returns {string}
     */
    start(ctx) {
        return this.visitExpressionSequence(ctx);
    }

    /*
 * Посещает потомков текущего узла
 *
 * @param {object} ctx
 * @returns {string}
 */
    visitChildren(ctx) {
        let code = '';

        for (let i = 0; i < ctx.getChildCount(); i++) {
            code += this.visit(ctx.getChild(i));
        }

        return code.trim();
    }

    /**
     * Посещает лист дерева (узел без потомков) и возвращает строку
     *
     * @param {object} ctx
     * @returns {string}
     */
    visitTerminal(ctx) {
        return ctx.getText();
    }

    /**
     * Посещает узел, отвечающий за присваивание значения параметру
     *
     * @param {object} ctx
     * @returns {string}
     */
    visitPropertyExpressionAssignment(ctx) {
        const key = this.visit(ctx.propertyName());
        const value = this.visit(ctx.singleExpression());

        // // Текстовое значение узла
        console.log(ctx.getText());
        // Кол-во узлов потомков
        console.log(ctx.getChildCount());
        // console.log(ctx.propertyName().getText()) Параметр x
        console.log(ctx.getChild(0).getText());
        // :
        console.log(ctx.getChild(1).getText());
        // console.log(ctx.singleExpression().getText()) Значение 1
        console.log(ctx.getChild(2).getText());
        return "'${key}': ${value}";
    }

    /**
     * Удаляет ключевое слово `new`
     *
     * @param {object} ctx
     * @returns {string}
     */
    visitNewExpression(ctx) {
        return this.visit(ctx.singleExpression());
    }


    /**
     * Посещает узел с ключевым словом `Number`
     *
     * @param {object} ctx
     * @returns {string}
     */
    visitNumberExpression(ctx) {
        const argumentList = ctx.arguments().argumentList();

        if (argumentList === null || argumentList.getChildCount() !== 1) {
            throw new SemanticArgumentCountMismatchError();
        }

        const arg = argumentList.singleExpression()[0];
        const number = this.removeQuotes(this.visit(arg));

        return `int(${number})`;
    }

    /**
     * Удаляет символы кавычек в начале и в конце строки
     *
     * @param {String} str
     * @returns {String}
     */
    removeQuotes(str) {
        let newStr = str;

        if (
            (str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') ||
            (str.charAt(0) === '\'' && str.charAt(str.length - 1) === '\'')
        ) {
            newStr = str.substr(1, str.length - 2);
        }

        return newStr;
    }
}

module.exports = Visitor;