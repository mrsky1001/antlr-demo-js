#!/bin/sh

java -Xmx500M -cp '/usr/local/lib/antlr-4.8-complete.jar:$CLASSPATH' org.antlr.v4.Tool  -Dlanguage=JavaScript -lib src/grammars -o lib -visitor -Xexact-output-dir src/grammars/*.g4