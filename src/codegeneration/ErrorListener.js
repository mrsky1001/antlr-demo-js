const antlr4 = require('antlr4');
const path = require('path');

const {SyntaxGenericError} = require(path.resolve('src/error', 'helper'));

/**
 * Пользовательский обработчик ошибок на стадии разбора строки
 *
 * @returns {object}
 */
class ErrorListener extends antlr4.error.ErrorListener {
    /**
     * Проверяет на синтаксические ошибки
     *
     * @param {object} recognizer Структура, используемая для распознавания ошибок
     * @param {object} symbol Символ, вызвавший ошибку
     * @param {int} line Строка с ошибкой
     * @param {int} column Позиция в строке
     * @param {string} message Текст ошибки
     * @param {string} payload Трассировка стека
     */
    syntaxError(recognizer, symbol, line, column, message, payload) {
        throw new SyntaxGenericError({line, column, message});
    }
}

module.exports = ErrorListener;