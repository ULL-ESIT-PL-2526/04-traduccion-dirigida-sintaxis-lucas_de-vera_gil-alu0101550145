# Syntax Directed Translation with Jison

Jison is a tool that receives as input a Syntax Directed Translation and produces as output a JavaScript parser  that executes
the semantic actions in a bottom up ortraversing of the parse tree.
 

## Compile the grammar to a parser

See file [grammar.jison](./src/grammar.jison) for the grammar specification. To compile it to a parser, run the following command in the terminal:
``` 
➜  jison git:(main) ✗ npx jison grammar.jison -o parser.js
```

## Use the parser

After compiling the grammar to a parser, you can use it in your JavaScript code. For example, you can run the following code in a Node.js environment:

```
➜  jison git:(main) ✗ node                                
Welcome to Node.js v25.6.0.
Type ".help" for more information.
> p = require("./parser.js")
{
  parser: { yy: {} },
  Parser: [Function: Parser],
  parse: [Function (anonymous)],
  main: [Function: commonjsMain]
}
> p.parse("2*3")
6
```
# 3.1 Diferencia entre /* skip whitespace */ y devolver un token.

La acción de lexer toma los caracteres y no devuelve ningún token, para devolver un token estaría "return 'NUMBER';" que produce un token que envía al parser.

# 3.2. Escriba la secuencia exacta de tokens producidos para la entrada 123**45+@.

Secuencia de tokens (en orden), mostrando token y yytext:

NUMBER (yytext = "123")
OP (yytext = "**")
NUMBER (yytext = "45")
OP (yytext = "+")
INVALID(yytext = "@")
EOF (yytext = "")

# 3.3. Indique por qué ** debe aparecer antes que [-+*/].

Debido a que es un operador de dos caracteres y el lexer debe reconocerlo como un único token OP. Ya que jison buscaría emparejar las reglas en orden.

# 3.4. Explique cuándo se devuelve EOF
Se devuelve EOF debido a que se termina de leer el final de la linea, para saber cuando se ha terminado de leer tokens.

# 3.5. Explique por qué existe la regla . que devuelve INVALID.

Debido a que la regla "." toma cualquier caracter que no haya sido "match" de alguno de los anteriores. Y devuelve "INVALID" para que ese carácter se consuma y se entregue al parser.