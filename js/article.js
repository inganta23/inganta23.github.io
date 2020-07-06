document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const arid = urlParams.get("id");
    const id = + arid;
    const btnSave = document.getElementById("save");
    const btnDel = document.getElementById("delete");
    if (isFromSaved) {
      btnSave.style.display = 'none';
      var item2 = getSavedArticleById();
       //ambil artikel lalu tampilkan
      getSavedArticleById();
      document.getElementById("back").href=`${window.location.origin}/#saved`;
    } else {
      getById(id).then(function(article){
        if(typeof article !== "undefined"){
          btnSave.style.display = 'none';
        }
      });
      btnDel.style.display = 'none';
      var item = getArticleById();
    }
    btnSave.onclick = function() {
      console.log("Tombol FAB di klik.");
      item.then(function(article) {
        let conf = confirm(`Apakah yakin ingin menyimpan tim ${article.name} ?`);
        if(conf){
          saveForLater(article);
          push(`Berhasil menyimpan tim ${article.name}`);
          window.location.replace(window.location.origin);
        }
      });
    };
    btnDel.onclick = function() {
      console.log("Tombol Del di klik.");
      item2.then(function(article) {
        let conf = confirm(`Apakah yakin ingin menghapus tim ${article.name} ?`);
        if(conf){
          Delete(article.id);
          push(`Berhasil menghapus tim ${article.name}`);
          window.location.replace(window.location.origin);
        }
      });
    };
});