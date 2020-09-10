https://github.com/antlr/grammars-v4/tree/master/javascript/ecmascript
https://habr.com/ru/post/351906/
https://gist.github.com/mattmcd/5425206
https://raw.githubusercontent.com/antlr/grammars-v4/master/javascript/ecmascript/JavaScript/ECMAScript.g4


$ brew cask install java  
$ cd /usr/local/lib  
$ curl -O http://www.antlr.org/download/antlr-4.8-complete.jar  
$ export CLASSPATH=".:/usr/local/lib/antlr-4.8-complete.jar:$CLASSPATH"  
$ alias antlr4='java -Xmx500M -cp "/usr/local/lib/antlr-4.8-complete.jar:$CLASSPATH" org.antlr.v4.Tool'  
$ alias grun='java org.antlr.v4.gui.TestRig'  
