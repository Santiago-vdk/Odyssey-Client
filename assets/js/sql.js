var Connection = require('tedious').Connection;
  var Request = require('tedious').Request;
  var TYPES = require('tedious').TYPES;

  
  
 
var scriptInicial = 'CREATE TABLE Library( Lib_name VARCHAR(16) NOT NULL PRIMARY KEY(Lib_NAME) )  CREATE TABLE Songs( Song_ID INT NOT NULL IDENTITY(0,1), Song_Name VARCHAR(64) NOT NULL, Song_Artist VARCHAR(32) NOT NULL,Song_Album VARCHAR(32) NOT NULL, Song_Year VARCHAR(4) NOT NULL, Song_Gen VARCHAR(24) NOT NULL, Lyrics VARCHAR(1000) NULL, Lib_name VARCHAR(16) NOT NULL,  PRIMARY KEY(Song_ID))  ALTER TABLE Songs 	ADD CONSTRAINT Songs_fk FOREIGN KEY(Lib_name) REFERENCES Library(Lib_name) ON DELETE CASCADE; CREATE TABLE Data( Song_ID INT NOT NULL, Path_Data VARCHAR(128) ) ALTER TABLE Data 	ADD CONSTRAINT Data_fk FOREIGN KEY(Song_ID) REFERENCES Songs(Song_ID) ON DELETE CASCADE';  
var procedure1 ='CREATE PROCEDURE new_lib ( @lib VARCHAR(MAX) ) AS BEGIN INSERT INTO Library (Lib_name) VALUES (@lib) END';
var procedure2 = 'CREATE PROCEDURE insert_song1 (@lib VARCHAR(MAX),@name VARCHAR(MAX),@artist VARCHAR(MAX),@album VARCHAR(MAX),@year VARCHAR(MAX),@gen VARCHAR(MAX),@Lyrics VARCHAR(MAX),@Path VARCHAR(MAX) ) AS BEGIN INSERT INTO Songs (Song_Name,Song_Artist,Song_Album,Song_Year,Song_Gen,Lyrics,Lib_name) VALUES (@name,@artist,@album,@year,@gen,@Lyrics,@lib) END';
//var procedure3 = 'CREATE PROCEDURE re_songs ( @lib VARCHAR(MAX) ) AS BEGIN SELECT S.Song_ID,S.Song_Name,S.Song_Artist,S.Song_Album,S.Song_Year,S.Song_Gen,S.Lyrics FROM Songs as S WHERE Lib_name=@lib END';
//var procedure4 = 'CREATE PROCEDURE re_song_data ( @id INT ) AS BEGIN SELECT D.Path_Data FROM Data as D WHERE Song_ID=@id END';
var procedure3 = 'CREATE PROCEDURE drop_song ( @id INT ) AS BEGIN DELETE FROM Songs WHERE Song_ID=@id END';
var procedure4 = 'CREATE PROCEDURE update_song ( @lib VARCHAR(MAX), @id INT, @name VARCHAR(MAX), @artist VARCHAR(MAX), @album VARCHAR(MAX), @year VARCHAR(MAX), @gen VARCHAR(MAX), @Lyrics VARCHAR(MAX) ) AS BEGIN UPDATE Songs SET Song_Name=@name,Song_Artist=@artist,Song_Album=@album,Song_Year=@year,Song_Gen=@gen,Lyrics=@Lyrics WHERE Song_Id=@id and Lib_name=@lib;  END';
var procedure5 = 'CREATE PROCEDURE insert_song2 (@name VARCHAR(MAX),@artist VARCHAR(MAX),@Path VARCHAR(MAX)) AS BEGIN DECLARE @id INT SET @id = (SELECT Song_ID FROM Songs WHERE Song_Name=@name and Song_Artist=@artist) INSERT INTO Data (Song_ID,Path_Data) Values (@id,@Path) END';  

var procedure6 = 'CREATE PROCEDURE insert_song_withID (@id INT,@lib VARCHAR(MAX),@name VARCHAR(MAX),@artist VARCHAR(MAX),@album VARCHAR(MAX),@year VARCHAR(MAX),@gen VARCHAR(MAX),@Lyrics VARCHAR(MAX),@Path VARCHAR(MAX)) AS BEGIN SET IDENTITY_INSERT Songs ON INSERT INTO Songs (Song_ID,Song_Name,Song_Artist,Song_Album,Song_Year,Song_Gen,Lyrics,Lib_name) VALUES (@id,@name,@artist,@album,@year,@gen,@Lyrics,@lib) SET IDENTITY_INSERT Songs OFF END';

  
  var config = {
    userName: 'SA',
    password: 'Badilla94',
    server: '192.168.1.129',
	options:{
		database: 'OdysseyDB'
	}
  };
  
  var config2 = {
			userName: 'SA',
			password: 'Badilla94',
			server: '192.168.1.129'
	};
  
  
  function initialize(){
	
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(scriptInicial, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  makeproc1();
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}

			
  
  }
  
  function makeproc1(){
  
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(procedure1, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  makeproc2();
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}

			
  
  }
  
  
  function makeproc2(){
  
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(procedure2, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  makeproc3();
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}

			
  
  }
  
  
  function makeproc3(){
  
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(procedure3, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  makeproc4();
				}
				
				connection.close();
			  });
			  connection.execSql(request);
			}

			
  
  }
  
  function makeproc4(){
  
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(procedure4, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  makeproc5();
				}
				
				connection.close();
			  });
			  connection.execSql(request);
			}

			
  
  }
  
  function makeproc5(){
  
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(procedure5, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  makeproc6();
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}
  
  }

   function makeproc6(){
  
			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(procedure6, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}
  
  }
  

  
    
	
function connecting(){

			var script = 'USE [master] if exists(select * from sysdatabases where name = \'OdysseyDB\' ) DROP DATABASE [OdysseyDB]';
			
			
			var connection = new Connection(config2);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			  

			function executeStatement() {
				
			  request = new Request(script, function(err, rowCount) {
				if (err) {
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  createDB();
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}
	
		
  

}

function createDB(){
	console.log("here");
	var create = 'CREATE DATABASE [OdysseyDB]';
			
			var connection = new Connection(config2);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
			  );
			  
			function executeStatement() {
				
			  request = new Request(create, function(err, rowCount) {
				if (err) {
				
				  console.log(err);
				} else {
				  console.log(rowCount + ' rows');
				  initialize();
				}
				
				connection.close();
			  });

			  connection.execSql(request);
			}
			
			
}
  
  
  function insert_song(songJson){
	

			  var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				  
				}
				);
				
				
				function executeStatement() {
					  request = new Request("insert_song1", function(err) {
						if (err) {
						  console.log(err);
						} 
						else{
							insert_song2(songJson);
						}

						connection.close();
						
					  });
					  
					  var query = JSON.parse(songJson);
					  
					  
						var lib =query.lib;
						var name = query.title;
						var artist = query.artist;
						var album = query.album;
						var year = query.year;
						var Lyrics = query.lyrics;
						var Path = query.path;
						var genre = query.genre;

						request.addParameter( 'lib',TYPES.VarChar, lib);
						request.addParameter( 'name',TYPES.VarChar, name);
						request.addParameter( 'artist',TYPES.VarChar, artist);
						request.addParameter( 'album',TYPES.VarChar, album);
						request.addParameter( 'year',TYPES.VarChar, year);
						request.addParameter( 'Lyrics',TYPES.VarChar, Lyrics);
						request.addParameter( 'Path',TYPES.VarChar, Path);
						request.addParameter( 'gen',TYPES.VarChar, genre);
						

						connection.callProcedure(request);
						
						}

}


function insert_song2(songJson){
	

			  var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				  
				}
				);
				
				
				function executeStatement() {
					  request = new Request("insert_song2", function(err) {
						if (err) {
						  console.log(err);
						} 

						connection.close();
						//printTable();
					  });
					  
					  
					   var query = JSON.parse(songJson);
					   
						var name = query.title;
						var artist = query.artist;
						var Path = query.path;

						request.addParameter( 'name',TYPES.VarChar, name);
						request.addParameter( 'artist',TYPES.VarChar, artist);
						request.addParameter( 'Path',TYPES.VarChar, Path);
						

						connection.callProcedure(request);
						
						}

}



function insert_song_withID(songJson){
	

			  var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				  
				}
				);
				
				
				function executeStatement() {
					  request = new Request("insert_song_withID", function(err) {
						if (err) {
						  console.log(err);
						} 

						connection.close();
						
					  });
					  
					  var query = JSON.parse(songJson);
					  
					  	var id = query.id;
						var lib =query.lib;
						var name = query.title;
						var artist = query.artist;
						var album = query.album;
						var year = query.year;
						var Lyrics = query.lyrics;
						var Path = query.path;
						var genre = query.genre;

						request.addParameter( 'id',TYPES.Int, id);
						request.addParameter( 'lib',TYPES.VarChar, lib);
						request.addParameter( 'name',TYPES.VarChar, name);
						request.addParameter( 'artist',TYPES.VarChar, artist);
						request.addParameter( 'album',TYPES.VarChar, album);
						request.addParameter( 'year',TYPES.VarChar, year);
						request.addParameter( 'Lyrics',TYPES.VarChar, Lyrics);
						request.addParameter( 'Path',TYPES.VarChar, Path);
						request.addParameter( 'gen',TYPES.VarChar, genre);
						

						connection.callProcedure(request);
						
						}

}


function new_lib(name){
	

			  var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				  
				}
				);
				
				
				function executeStatement() {
					  request = new Request("new_lib", function(err) {
						if (err) {
						  console.log(err);
						} 

						else{
						}
						connection.close();
					  });
					  
						request.addParameter( 'lib',TYPES.VarChar,name);

						connection.callProcedure(request);
						}

}

function drop_song(id){

			var connection = new Connection(config);

			  connection.on('connect', function(err) {
				  executeStatement();
				}
				);
				
				
				function executeStatement() {
						console.log('entre');
					  request = new Request("drop_song", function(err) {
						if (err) {
						  console.log(err);
						} 

						connection.close();
					  });
					  
						request.addParameter( 'id',TYPES.VarChar,id);

						connection.callProcedure(request);
						}

}

function update_song(songJson){

			var connection = new Connection(config);

			connection.on('connect', function(err) {
				executeStatement();
				}
				);
				
				
				function executeStatement() {
						console.log('entre');
					  request = new Request("update_song", function(err) {
						if (err) {
						  console.log(err);
						} 

						connection.close();
					  });
					  
					  var query = JSON.parse(songJson);
					  
						
						var lib =query.lib;
						var title = query.title;
						var artist = query.artist;
						var album = query.album;
						var year = query.year;
						var Lyrics = query.lyrics;
						var id = query.id;
						var genre = query.genre;
					  

						request.addParameter( 'lib',TYPES.VarChar, lib);
						request.addParameter( 'name',TYPES.VarChar, title);
						request.addParameter( 'artist',TYPES.VarChar, artist);
						request.addParameter( 'album',TYPES.VarChar, album);
						request.addParameter( 'year',TYPES.VarChar, year);
						request.addParameter( 'Lyrics',TYPES.VarChar, Lyrics);
						request.addParameter( 'id',TYPES.Int, id);
						request.addParameter( 'gen',TYPES.VarChar, genre);

						connection.callProcedure(request);
						
						}

}


function re_song_data(id,fn){
	

			  var connection = new Connection(config);
			  var query = 'SELECT D.Path_Data FROM Data as D WHERE Song_ID='+id;

			  connection.on('connect', function(err) {
				  executeStatement(function(result){
					fn(result);	
				});
				});
				
				
				function executeStatement(fn2) {
					  request = new Request(query, function(err) {
						if (err) {
						  console.log(err);
						} 
						else{
						}

						connection.close();
						
					  });

					  var result = '';

						request.on('row', function(columns) {
					columns.forEach(function(column) {
					  if (column.value === null) {
						console.log('NULL');
					  } else {
						result = column.value;
					  }
					});
					
				  });

				  request.on('doneInProc', function(rowCount, more) {
					console.log(rowCount + ' rows returned');
					fn2(result);
				  });

				  connection.execSql(request);
						
						}

}
var dios = [];
function re_songs(lib, fn){
			var lista = [];

			  var connection = new Connection(config);
			  var query = 'SELECT S.Song_ID,S.Song_Name,S.Song_Artist,S.Song_Album,S.Song_Year,S.Song_Gen,S.Lyrics FROM Songs as S WHERE Lib_name=\''+lib+'\'';

			  connection.on('connect', function(err) {
				executeStatement(function(result){
					fn(result);	
				});
				
				
				});

			  		function executeStatement(fn2){

			  	   	var  request = new Request(query, function(err) {
						if (err) {
						  console.log(err);
						} 
						else{
						}
						connection.close();
					  });
 						
					  	
					  
					   request.on('row', function(columns) {
								//console.log(columns);
								var object = new makeJson(columns);
								lista.push(object);
					
				  		});

						
				  request.on('doneInProc', function(rowCount, more, rows) {
					console.log(rowCount + ' rows returned');
					fn2(lista);
					
				  });

		connection.execSql(request);
		

}
			 
				
}

function makeJson(columns){
		var json = {
								"title":columns[1].value,
								"artist":columns[2].value,
								"album":columns[3].value,
								"year":columns[4].value,
								"lyrics":columns[5].value,
								"genre":columns[6].value,
								"id":columns[0].value
							}
		
		return json;
}



/*


// *********************************************** funciones disponibles ****************************************************



connecting(); // llamar siempre al loguear, elimina la DB anterior y crea una nueva (script inicial)

new_lib('name'); // crea una nueva library con ese nombre

insert_song(songJson); // inserta una cancion con la info del songJson 

insert_song_withID(songJson); // inserta una cancion con la info del songJson (este Json incluye "id":"value" )

update_song(songJson); // actualiza la cancion con la info del songJson (este Json incluye "id":"value" para identificar la cancion)

drop_song(id); // elimina la cancion que tenga ese id



re_song_data(id, function(result){
                                                    // retorna el path de la cancion que tenga ese id (result contiene el valor del return)
	console.log(result);
});   




re_songs(lib, function(result){
													 // retorna un Json array con todas las canciones de la biblioteca lib (result contiene el valor del return) 
	console.log(result);
});                                        



// *********************************************** funciones disponibles ****************************************************

*/

