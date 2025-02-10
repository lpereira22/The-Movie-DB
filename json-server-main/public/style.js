const url = 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=pt-br&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlZmQ5ZjNjMjE3OTk1MjE5MTBjYzI1ZGZlZDBjOCIsIm5iZiI6MTczMjgxODI4Ni44NzY0NTk0LCJzdWIiOiI2NzQ0Y2VmMmNjMWQ2OTk4NmJkOWU3NTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6cnjlAMaDbKA-hFqPodxLwSYzM8cYGAYZS0NYT8JZY4'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => {
    console.log(json)
    let str = "";
    for(let i = 0; i < json.results.length; i++){
        let letSeries = json.results[i]
        str += `<a href="detalhesFilmes.html?id=${letSeries.id}"><div class="col">
                      <div class="card h-100">
                        <img src="https://image.tmdb.org/t/p/w500${letSeries.backdrop_path}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${letSeries.name}</h5>
                          
                        </div>
                        <div class="card-footer">
                          <small class="text-body-secondary">${letSeries.first_air_date}</small>
                        </div>
                      </div>
                    </div></a>
  `
    }
    document.getElementById('cardNewSeries').innerHTML = str;
  }
)
.catch(err => console.error(err));

  const urlPopulares = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1';
  const optionsPopulares = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlZmQ5ZjNjMjE3OTk1MjE5MTBjYzI1ZGZlZDBjOCIsIm5iZiI6MTczMjgxODI4Ni44NzY0NTk0LCJzdWIiOiI2NzQ0Y2VmMmNjMWQ2OTk4NmJkOWU3NTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6cnjlAMaDbKA-hFqPodxLwSYzM8cYGAYZS0NYT8JZY4'
    }
  };
  
  fetch(urlPopulares, optionsPopulares)
    .then(res => res.json())
    .then(json => {
      strPopulares = `<div class="carousel-item active">     
                        <img src="https://image.tmdb.org/t/p/w500${json.results[0].poster_path}" height="500px" class="d-block w-100" alt="...">
                      </div>`;
      for(let i = 1; i < json.results.length; i++){
      
               strPopulares+=   `<div class="carousel-item">
                                    <img src="https://image.tmdb.org/t/p/w500${json.results[i].poster_path}" height="500px" class="d-block w-100" alt="...">
                                  </div>`
      }


      document.querySelector(".carousel-inner").innerHTML = strPopulares;

      
    })
    .catch(err => console.error(err));
    

    //-------------------------------------------profile
    fetch('/profile')
    .then (res => res.json())
    .then (json => {
      console.log(json)
      document.querySelector(".dadosAluno").innerHTML = `
      <p><strong>Aluno:</strong> ${json[0].name}</p>
      <p><strong>Aluno:</strong> ${json[0].curso}</p>
      <p><strong>Email:</strong> ${json[0].email}</p>`

      document.getElementById("linkRedesSociais").innerHTML = `
        <a href="${json[0].facebook}" target="blank"><img src="./assets/img/icons8-facebook-novo-16x16.png" alt=""></a>
        <a href="${json[0].twitter}" target="blank"><img src="./assets/img/icons8-twitter-16x16.png" alt=""></a>
        <a href="${json[0].instagram}" target="blank"><img src="./assets/img/icons8-instagram-16x16.png" alt=""></a>
      `
      document.getElementById("biografia").innerHTML = `
      ${json[0].biografia}
      `
    })
    .catch(err => console.error(err));

    
    fetch('/seriePreferidas')
    .then (res => res.json())
    .then (json => {
      console.log(json)
      var strMinhasSeries = ""
      for(let i = 0; i < json.length; i++){
        strMinhasSeries += `<div class="col">
                  <div class="card h-100">
                    <img src="https://image.tmdb.org/t/p/w500${json[i].img}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${json[i].titulo}</h5>
                      <p class="card-text">${json[i].text}</p>
                    </div>
                      <div class="card-footer">
                        <small class="text-body-secondary">${json[i].date}</small>
                      </div>
                  </div>
                </div>
                `
      }
        document.getElementById('cardMinhaSeries').innerHTML = strMinhasSeries;

    })
    .catch(err => console.error(err));

