 function insertSong(songs) {


     var sql = require('sql.js');
     var fs = require('fs');
     // or sql = window.SQL if you are in a browser 

     // Create a database 
     var db = new sql.Database();
     // NOTE: You can also use new sql.Database(data) where 
     // data is an Uint8Array representing an SQLite database file 

     // Execute some sql 
     sqlstr = "CREATE TABLE library (id int, song_name char);";


     for (var i = 0; i < songs.length; i++) {
         sqlstr += "INSERT INTO library VALUES ("+ i + ",'" + songs[i].name + "');";
     }

     
     
     db.run(sqlstr); // Run the query without returning anything 
     //
     //     var res = db.exec("SELECT * FROM hello");
     //     /*
     //     [
     //         {columns:['a','b'], values:[[0,'hello'],[1,'world']]}
     //     ]
     //     */
     //
     //     // Prepare an sql statement 
     //     var stmt = db.prepare("SELECT * FROM library WHERE a=:aval AND b=:bval");
     //
     //     // Bind values to the parameters and fetch the results of the query 
     //     var result = stmt.getAsObject({
     //         ':aval': 0,
     //         ':bval': song
     //     });
     //     console.log(result); // Will print {a:1, b:'world'} 
     //
     //
     //     // free the memory used by the statement 
     //     stmt.free();
     //     // You can not use your statement anymore once it has been freed. 
     //     // But not freeing your statements causes memory leaks. You don't want that. 
     //
     
     //Exporto la BD
     var data = db.export();
     var buffer = new Buffer(data);
     fs.writeFileSync("locallibrary.sqlite", buffer);

 };