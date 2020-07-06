const base_url = 'https://api.football-data.org'
const api_token = '3e5d8430b7e84b1a96ce689c22b3cd40'

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log(`Error :${response.status}`);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log(`Error :${response.status}`);
}

// Blok kode untuk melakukan request data json
function getArticles() {
  if ("caches" in window) {
    caches.match(`${base_url}/v2/competitions/2021/teams`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let articlesHTML = "";
          data.teams.forEach(function(article) {
            let urlTeamImage = article.crestUrl
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
            articlesHTML += `
            <div class="col s12">
                <div class="card teal lighten-4">
                  <div class="card-content row valign-wrapper">
                    <div class="col s4" class="logo-team">
                      <img src="${urlTeamImage}" alt="${article.name}" class="responsive-img center-align" width="80%" >
                    </div>
                    <div class="col s8 information-team">
                      <span class="badge-blue"><strong>${article.name}</strong></span>
                    </div>
                  </div>
                  <div class="card-action center-align">
                    <a href="./article.html?id=${article.id}" class="white-text btn blue accent-3">DETAIL</a>
                  </div>
                </div>
              </div>
        `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
        });
      }
    });
  }


  

  fetch(`${base_url}/v2/competitions/2021/teams`,{
    headers : {
      'X-Auth-Token' : api_token
      }
    })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      let articlesHTML = "";
          data.teams.forEach(function(article) {
            let urlTeamImage = article.crestUrl
            urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
            articlesHTML += `
            <div class="col s12">
                <div class="card teal lighten-4">
                  <div class="card-content row valign-wrapper">
                    <div class="col s4" class="logo-team">
                      <img src="${urlTeamImage}" alt="${article.name}" class="responsive-img center-align" width="80%" >
                    </div>
                    <div class="col s8 information-team">
                      <span class="badge-blue"><strong>${article.name}</strong></span>
                    </div>
                  </div>
                  <div class="card-action center-align">
                    <a href="./article.html?id=${article.id}" class="white-text btn blue accent-3">DETAIL</a>
                  </div>
                </div>
              </div>
        `;
          });
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("articles").innerHTML = articlesHTML;
    })
    .catch(error);
}


function getStandings () {
  if('caches' in window){
      caches.match(`${base_url}/v2/competitions/2021/standings`)
      .then(function(response) {
          if(response){
              response.json().then(function(data){
                  let standingsHTML = ''
                  data = data.standings[0].table

                  data.forEach(dataTeam => {
                      let urlTeamImage = dataTeam.team.crestUrl
                      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                      standingsHTML +=
                      `
                      <tr>
                      <td>${dataTeam.position}</td>
                      <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                      <td>${dataTeam.team.name}</td>
                      <td>${dataTeam.playedGames}</td>
                      <td>${dataTeam.won}</td>
                      <td>${dataTeam.draw}</td>
                      <td>${dataTeam.lost}</td>
                      <td>${dataTeam.goalsFor}</td>
                      <td>${dataTeam.goalsAgainst}</td>
                      <td>${dataTeam.goalDifference}</td>
                      <td>${dataTeam.points}</td>
                      </tr>
                      `;
                  });
                  document.getElementById('progress').style.display = 'none'
                  document.getElementById('standings').innerHTML = standingsHTML
              })
              .catch(error)
          }
      });
      
  }
  
  fetch(`${base_url}/v2/competitions/2021/standings`,{
      headers:{
          'X-Auth-Token' : api_token
      }
  })
  .then(status)
  .then(json)
  .then(function(data){
      let standingsHTML = ''
      data = data.standings[0].table

      data.forEach(dataTeam => {
          let urlTeamImage = dataTeam.team.crestUrl
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
          standingsHTML +=
          `
          <tr>
          <td>${dataTeam.position}</td>
          <td><img src="${urlTeamImage}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
          <td>${dataTeam.team.name}</td>
          <td>${dataTeam.playedGames}</td>
          <td>${dataTeam.won}</td>
          <td>${dataTeam.draw}</td>
          <td>${dataTeam.lost}</td>
          <td>${dataTeam.goalsFor}</td>
          <td>${dataTeam.goalsAgainst}</td>
          <td>${dataTeam.goalDifference}</td>
          <td>${dataTeam.points}</td>
          </tr>
          `;
      });
      document.getElementById('progress').style.display = 'none'
      document.getElementById('standings').innerHTML = standingsHTML
  })
  .catch(error)
}


function getArticleById() {
  return new Promise(function(resolve, reject) {
  // Ambil nilai query parameter (?id=)
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(`${base_url}/v2/teams/${idParam}`).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let urlTeamImage = data.crestUrl
          urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
          let articleHTML =`
          <div class="col s12">
             <div class="card">
               <div class="card-content row valign-wrapper">
                 <div class="col s4" class="logo-team">
                   <img src="${urlTeamImage}" alt="${data.name}" class="responsive-img center-align" width="80%" >
                 </div>
                 <div class="col s8 information-team">
                   <span class="badge-blue"><strong>Fullname : ${data.name}</strong></span>
                   </br><span class="badge-blue"><strong>Venue : ${data.venue}</strong></span>
                   </br><span class="badge-blue"><strong>Founded : ${data.founded}</strong></span>
                   </br><span class="badge-blue"><strong>Address : ${data.address}</strong></span>
                   </br><span class="badge-blue"><strong>Founded : ${data.founded}</strong></span>
                   </br><span class="badge-blue"><strong>Phone : ${data.phone}</strong></span>
                   </br><span class="badge-blue"><strong>Email : ${data.email}</strong></span>
                 </div>
               </div>
             </div>
           </div>
         `;
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = articleHTML;
          resolve(data);
        });
      }
    });
  }

  fetch(`${base_url}/v2/teams/${idParam}`,{
    headers:{
        'X-Auth-Token' : api_token
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      console.log(data);
      // Menyusun komponen card artikel secara dinamis
      let urlTeamImage = data.crestUrl
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
      let articleHTML = `
      <div class="col s12">
         <div class="card">
           <div class="card-content row valign-wrapper">
             <div class="col s4" class="logo-team">
               <img src="${urlTeamImage}" alt="${data.name}" class="responsive-img center-align" width="80%" >
             </div>
             <div class="col s8 information-team">
               <span class="badge-blue"><strong>Fullname : ${data.name}</strong></span>
               </br><span class="badge-blue"><strong>Venue : ${data.venue}</strong></span>
               </br><span class="badge-blue"><strong>Founded : ${data.founded}</strong></span>
               </br><span class="badge-blue"><strong>Address : ${data.address}</strong></span>
               </br><span class="badge-blue"><strong>Founded : ${data.founded}</strong></span>
               </br><span class="badge-blue"><strong>Phone : ${data.phone}</strong></span>
               </br><span class="badge-blue"><strong>Email : ${data.email}</strong></span>
             </div>
           </div>
         </div>
       </div>
     `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = articleHTML;
      resolve(data);
    });
  });
}

function getSavedArticles() {
  getAll().then(function(articles) {
    console.log(articles);
    // Menyusun komponen card artikel secara dinamis
    let articlesHTML = "";
    articles.forEach(function(article) {
      let urlTeamImage = article.crestUrl
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
      articlesHTML += `
      <div class="col s12">
          <div class="card teal lighten-4">
            <div class="card-content row valign-wrapper">
              <div class="col s4" class="logo-team">
                <img src="${urlTeamImage}" alt="${article.name}" class="responsive-img center-align" width="80%" >
              </div>
              <div class="col s8 information-team">
                <span class="badge-blue"><strong>${article.name}</strong></span>
              </div>
            </div>
            <div class="card-action center-align">
              <a href="./article.html?id=${article.id}&saved=true" class="white-text btn blue accent-3">DETAIL</a>
            </div>
          </div>
        </div>
  `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = articlesHTML;
  });
}

function getSavedArticleById() {
  return new Promise(function(resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    const param = + idParam;
    //console.log(typeof param);
    getById(param).then(function(article) {
      let articlesHTML = "";
      let urlTeamImage = article.crestUrl
      urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
        articlesHTML += `
        <div class="col s12">
          <div class="card">
            <div class="card-content row valign-wrapper">
              <div class="col s4" class="logo-team">
                <img src="${urlTeamImage}" alt="${article.name}" class="responsive-img center-align" width="80%" >
              </div>
              <div class="col s8 information-team">
                  <span class="badge-blue"><strong>Fullname : ${article.name}</strong></span>
                  </br><span class="badge-blue"><strong>Venue : ${article.venue}</strong></span>
                  </br><span class="badge-blue"><strong>Founded : ${article.founded}</strong></span>
                  </br><span class="badge-blue"><strong>Address : ${article.address}</strong></span>
                  </br><span class="badge-blue"><strong>Founded : ${article.founded}</strong></span>
                  </br><span class="badge-blue"><strong>Phone : ${article.phone}</strong></span>
                  </br><span class="badge-blue"><strong>Email : ${article.email}</strong></span>
              </div>
            </div>
          </div>
        </div>
        `;
            // Sisipkan komponen card ke dalam elemen dengan id #body-content
            document.getElementById("body-content").innerHTML = articlesHTML;
            resolve(article);
      });  
  });  
}
