/* Lexer */
%lex
%%
\s+                   { /* skip whitespace */; }
\/\/.*                { /* skip single-line comment */; }
[0-9]+(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)? { return 'NUMBER'; }
"+"                   { return 'OPAD'; }
"-"                   { return 'OPAD'; }
"**"                  { return 'OPOW'; }
"*"                   { return 'OPMU'; }
"/"                   { return 'OPMU'; }
<<EOF>>               { return 'EOF'; }
.                     { return 'INVALID'; }
/lex

/* Parser */
%start L
%token NUMBER OPAD OPMU OPOW
%%

L
    : E EOF
        { return $E; }
    ;

E
    : E OPAD T
        { $$ = operate($OPAD, $E, $T); }
    | T
        { $$ = $T; }
    ;

T
    : T OPMU R
        { $$ = operate($OPMU, $T, $R); }
    | R
        { $$ = $R; }
    ;

R
    : F OPOW R
        { $$ = operate($OPOW, $F, $R); }
    | F
        { $$ = $F; }
    ;

F
    : NUMBER
        { $$ = Number(yytext); }
    ;
%%

function operate(op, left, right) {
    switch (op) {
        case '+': return left + right;
        case '-': return left - right;
        case '*': return left * right;
        case '/': return left / right;
        case '↑':
        case '**': return Math.pow(left, right);
    }
}
