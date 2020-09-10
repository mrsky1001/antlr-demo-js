const ECMAScriptVisitor = require('../../lib/ECMAScriptVisitor.js').ECMAScriptVisitor;

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

        // Текстовое значение узла
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
}

module.exports = Visitor;