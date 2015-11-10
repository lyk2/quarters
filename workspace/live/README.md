Start application
```
npm start
```
System
	- node 4.1.1
	- npm 2.14.4

For easy development
```
	npm install forever -g
	forever start -w bin/www
```

useful links
http://stackoverflow.com/questions/7666977/syntax-highlighting-for-jade-in-sublime-text-2
http://webapplog.com/jade/

less workflow 
create .less files instead of .css for theme styles
quarters > source > less
create/edit .less files here (eg. variables.less, header.less, navbar.less, etc.)
styles.less contains only imports to other .less files and gets compiled to css\styles.css
as such, don't forget to import any new .less files you create to styles.less
the bootstrap folder can be left alone (ie. don't edit bootstrap\variables.less). instead, create a new .less file to overwrite any styles
the only file in css should be styles.css
to compile less files to css, the simplest way is the command line. fmi: http://lesscss.org/#using-less-installation
if you plan on making a lot of changes to .less files, consider compiling on your text editor: http://lesscss.org/usage/#editors-and-plugins-editors-and-ides 
fmi on the less workflow: http://www.helloerik.com/bootstrap-3-less-workflow-tutorial