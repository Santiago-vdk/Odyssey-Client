 function initializeLocal() {

     mkdir('storage/' + localStorage.username + '/1/');

 }

 function mkdir(path, root) {
     var fs = require('fs');
     var dirs = path.split('/'),
         dir = dirs.shift(),
         root = (root || '') + dir + '/';

     try {
         fs.mkdirSync(root);
     } catch (e) {
         //dir wasn't made, something went wrong
         if (!fs.statSync(root).isDirectory()) throw new Error(e);
     }

     return !dirs.length || mkdir(dirs.join('/'), root);
 }

 function clear() {
     rmDir('storage/')
 }

 function rmDir(dirPath) {
     console.log("clearing");
     var fs = require('fs');
     try {
         var files = fs.readdirSync(dirPath);
     } catch (e) {
         return;
     }
     if (files.length > 0)
         for (var i = 0; i < files.length; i++) {
             var filePath = dirPath + '/' + files[i];
             if (fs.statSync(filePath).isFile())
                 fs.unlinkSync(filePath);
             else
                 rmDir(filePath);
         }
     fs.rmdirSync(dirPath);
 };