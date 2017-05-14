let MongoClient = require('mongodb').MongoClient;

// 插入文档
function insertDocuments(documents, callback) {

  MongoClient.connect('mongodb://127.0.0.1:27017/memoro', (err, db)=>{

    if (err) {
      throw err;
    } else {
      let collection = db.collection('my');
      collection.insertMany(documents, function(err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
        }

        db.close();
      })
    }
  })
  
}

// 更新文档
function updateDocuments(index, props, callback) {
  
  MongoClient.connect('mongodb://127.0.0.1:27017/memoro', (err, db)=>{

    if (err) {
      throw err;
    } else {
      let collection = db.collection('my');
      collection.updateMany(index, {$set : props}, function(err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
        }

        db.close();
      })
    }
  })

}

// 删除文档
function deleteDocuments(index, callback) {

  MongoClient.connect('mongodb://127.0.0.1:27017/memoro', (err, db)=>{

    if (err) {
      throw err;
    } else {
      let collection = db.collection('my');
      collection.deleteMany(index, function(err, result) {
        if (err) {
          throw err;
        } else {
          callback(result);
        }

        db.close();
      })
    }
  })

}

// 查看文档
function findDocuments(callback) {

  MongoClient.connect('mongodb://127.0.0.1:27017/memoro', (err, db)=>{

    if (err) {
      throw err;
    } else {
      let collection = db.collection('my');
      collection.find({}).toArray(function(err, docs) {
        if (err) {
          throw err;
        } else {
          callback(docs);
        }

        db.close();
      })
    }
  })
  
}


exports = module.exports = {insertDocuments, updateDocuments, deleteDocuments, findDocuments};