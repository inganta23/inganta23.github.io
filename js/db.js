let dbPromised = idb.open("football", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("articles", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("venue", "venue", { unique: false });
  });

  function saveForLater(article) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("articles", "readwrite");
        let store = tx.objectStore("articles");
        console.log(article);
        store.put(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("articles", "readonly");
          let store = tx.objectStore("articles");
          return store.getAll();
        })
        .then(function(articles) {
          resolve(articles);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("articles", "readonly");
          let store = tx.objectStore("articles");
          return store.get(id);
        })
        .then(function(article) {
          console.log(article);
          resolve(article);
        });
    });
  }

  function Delete(id) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("articles", "readwrite");
        let store = tx.objectStore("articles");
        console.log(id);
        store.delete(id);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di hapus.");
      });
  }