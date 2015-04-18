# astii

A JavaScript AST-aware diff and patch toolset

When comparing two JavaScript files, standard diff tools compare the two files line-by-line
and output the lines on which the files differ.
This tool does not compare the two source files but their abstract representation - their [abstract syntax trees](http://en.wikipedia.org/wiki/Abstract_syntax_tree).

```
JavaScript source file1          JavaScript source file2  
         +                                +               
         |                                |               
         |                                |               
         |                                |               
         v                                v               
abstract syntax tree             abstract syntax tree     
         +                                +               
         |                                |               
         |                                |               
         |                                |               
         v                                v               
generated JS source file         generated JS source file2
                    +              +                      
                    |              |                      
                    |     ++++     |                      
                    +---> diff <---+                      
                          ----                             
```

This enables you to have more meaningfull diffs between files which may be very simmilar but have different source code formatting.


## installation: 

npm install . -g


## usage
  Usage: astii [options] [command]


  Commands:

    patch <file1> <patchfile>               apply an astii-generated diff file to an original in an AST-aware way
    diff <file1> <file2>                    compare AST-neutral representations of two JavaScript files line by line
    git-diff <file1> <SHA>                  compare AST-neutral representations of a JavaScript files against its specified git revision
    git-diff-version <file1> <SHA1> <SHA2>  compare AST-neutral representations of a JavaScript file between two git revisions

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

