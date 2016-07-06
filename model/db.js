var connection = require('../config');
connection = connection.connection;

function search_item(datas, item){
  	var item_array = [];
  	var data = datas[0]
		item_array.push(data[item]);

		for(var i in datas){
			data = datas[i];
			for(var j in item_array){
				if(data[item] == null) continue;
				var regex = data[item].replace(/\(/g, "\\(");
				regex = regex.replace(/\)/g, "\\)");
				regex = regex.replace(/\./g, "\\.");

				if(item_array[j].match(regex) != null)
					break;
				else if (j == item_array.length - 1){
					item_array.push(data[item]);
				}
			}
		}
		return item_array;
}

exports.Insert = function Insert(table,data,callback){
  var sql = "INSERT INTO " + table + " SET ? ";
  console.log(sql);
  console.log("Data: {");
  for(var i in data){
    console.log(i+" : "+data[i]);
  }
  console.log("}");
  connection.query(sql,data,function(err){
    if (err) throw err;
    console.log("Create Success!");
    callback(err);
  });
}


exports.DeleteById = function DeleteById(table,id,callback){
  var sql = "DELETE FROM " + table + " WHERE id = " + id;
  console.log(sql);
  connection.query(sql,function(err){
    if (err) throw err;
    console.log("DELETE Success!");
    callback(err);
  });
}

exports.getall = function getall(table,callback){
  var sql = "SELECT * FROM " + table +" ORDER BY id DESC" ;
  console.log(sql);
  connection.query(sql,function(err, results, fields){
    if (err) throw err;
    callback(results);
  });
}

exports.getcols = function getcols(table,cols,callback){
  var sql = "SELECT " + cols + " FROM " + table ;
  console.log(sql);
  connection.query(sql,function(err, results, fields){
    if (err) throw err;
    callback(results);
  });
}

exports.findbyID = function findbyID(table,id,callback){
  var sql = "SELECT * FROM " + table +" WHERE id = "+ id;
  console.log(sql);
  connection.query(sql,function(err, results, fields){
    if (err) throw err;
    callback(results);
  });
}

exports.findbyCourseName = function findbyCourseName(table,courseName,callback){
  var sql = "SELECT * FROM " + table +" WHERE course_name = "+ "\'" + courseName + "\'";
  console.log(sql);
  connection.query(sql,function(err, results, fields){
    if (err) throw err;
    callback(results);
  });
}

exports.findbyTeacher = function findbyTeacher(table,name,callback){
  var sql = "SELECT * FROM " + table +" WHERE teacher = "+ "\'" + name + "\'";
  console.log(sql);
  connection.query(sql,function(err, results, fields){
    if (err) throw err;
    callback(results);
  });
}

exports.query_post = function query_post(datas, req, item,callback){
	var teacher = search_item(datas, "teacher");
  var courseName = search_item(datas, "course_name");

	var regex = req.replace(/\(/g, "\\(");
	regex = regex.replace(/\)/g, "\\)");
	regex = regex.replace(/\./g, "\\.");
  var query_data = [];
  if(item=="query"){
    for(var i in datas){
  		var data = datas[i]
  		if(data['teacher'].match(regex)){
  			query_data.push(datas[i]);
  		}
      if(data['course_name'].match(regex)){
        query_data.push(datas[i]);
      }
  	}
  }
  else{
  	for(var i in datas){
  		var data = datas[i]
  		if(data[item].match(regex)){
  			query_data.push(datas[i]);
  		}
  	}
  }

  callback(query_data,teacher,courseName);
}


exports.search_item = function search_item(datas, item){
  	var item_array = [];
  	var data = datas[0]
		item_array.push(data[item]);

		for(var i in datas){
			data = datas[i];
			for(var j in item_array){
				if(data[item] == null) continue;
				var regex = data[item].replace(/\(/g, "\\(");
				regex = regex.replace(/\)/g, "\\)");
				regex = regex.replace(/\./g, "\\.");

				if(item_array[j].match(regex) != null)
					break;
				else if (j == item_array.length - 1){
					item_array.push(data[item]);
				}
			}
		}
		return item_array;
}
