#!/bin/sh

java -Xmx500M -cp '/usr/local/lib/antlr-4.7.1-complete.jar:$CLASSPATH' org.antlr.v4.Tool  -Dlanguage=JavaScript -lib grammars -o lib -visitor -Xexact-output-dir grammars/ECMAScript.g4