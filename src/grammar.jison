/* Lexer */
%lex
%%
\s+                   { /* skip whitespace */; }
\/\/[^\n]*                { /* skip single-line comment */; }
[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)? { return 'NUMBER'; }
"+"                   { return 'OPAD'; }
"-"                   { return 'OPAD'; }
"**"                  { return 'OPOW'; }
"*"                   { return 'OPMU'; }
"/"                   { return 'OPMU'; }
"("                   { return 'LPAREN'; }
")"                   { return 'RPAREN'; }
<<EOF>>               { return 'EOF'; }
.                     { return 'INVALID'; }
/lex

/* Parser */
%start inicio
%token NUMBER OPAD OPMU OPOW LPAREN RPAREN
%%

inicio
    : expresion EOF
        { return $expresion; }
    ;

expresion
    : expresion OPAD termino
        { $$ = operate($OPAD, $expresion, $termino); }
    | termino
        { $$ = $termino; }
    ;

termino
    : termino OPMU potencia
        { $$ = operate($OPMU, $termino, $potencia); }
    | potencia
        { $$ = $potencia; }
    ;

potencia
    : factor OPOW potencia
        { $$ = operate($OPOW, $factor, $potencia); }
    | factor
        { $$ = $factor; }
    ;

factor
    : NUMBER
        { $$ = Number(yytext); }
    | LPAREN expresion RPAREN
        { $$ = $expresion; }
    ;
%%

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '**': return Math.pow(left, right);
    }
}
