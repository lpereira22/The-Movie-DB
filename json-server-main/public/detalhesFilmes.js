const query = window.location.search;

let parametros = new URLSearchParams(query);
let id = parametros.get("id");
console.log(id);

const url = `https://api.themoviedb.org/3/tv/${id}?language=pt-br`;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlZmQ5ZjNjMjE3OTk1MjE5MTBjYzI1ZGZlZDBjOCIsIm5iZiI6MTczMjgxODI4Ni44NzY0NTk0LCJzdWIiOiI2NzQ0Y2VmMmNjMWQ2OTk4NmJkOWU3NTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6cnjlAMaDbKA-hFqPodxLwSYzM8cYGAYZS0NYT8JZY4'
  }
};

var divDetalhes = document.getElementById('visaoGeral');

fetch(url, options)
  .then(res => res.json())
  .then(json => {
    console.log(json);
    var stringDetalhes = `
            <h1>${json.name}</h1>
            <div class="Line"></div>
                <img src="https://image.tmdb.org/t/p/w500${json.backdrop_path}" class="card-img-top" height="300px" alt="...">
            <div class="detalhesSerie">
              <h6><strong>Titulo:<strong> ${json.name}<h6>
              <h6><strong>Idioma:<strong> ${json.languages}<h6>
            </div>
            <p></p>
          `;
    let strCategoria = "";
    for (let i = 0; i < json.genres.length; i++) {
      strCategoria += ` ${json.genres[i].name},`;
    }

    document.querySelector(".genFav").innerHTML = `<h6><strong>Categoria<strong><h6>` + strCategoria;
    divDetalhes.innerHTML = stringDetalhes;

    document.getElementById('btnFav').addEventListener('click', function () {
      const confirmarFavorito = window.confirm("Você deseja adicionar realmente esta série?");
      if (confirmarFavorito) {
        // Primeiro, verifica se o ID já está nos favoritos
        fetch('http://localhost:3000/seriePreferidas')
          .then(response => response.json())
          .then(series => {
            const jaExiste = series.some(serie => serie.id === id); // Verifica se o ID já existe
            if (jaExiste) {
              alert('Esta série já está nos seus favoritos!');
              return;
            }

            // Caso não exista, adiciona a série como favorito
            const favorito = {
              id: id,
              titulo: json.name,
              img: json.poster_path,
              date: json.first_air_date,
              text: json.overview,
            };

            fetch('http://localhost:3000/seriePreferidas', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(favorito)
            })
              .then(response => response.json())
              .then(data => {
                console.log('Série favorita adicionada:', data);
                alert('Série adicionada aos favoritos com sucesso!');
              })
              .catch(error => console.error('Erro ao salvar a série favorita:', error));
          })
          .catch(error => console.error('Erro ao verificar séries favoritas:', error));
      }
    });
  })
  .catch(err => console.error(err));



const urlElenco = `https://api.themoviedb.org/3/tv/${id}/credits?language=pt-br`;
const optionsElenco = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlZmQ5ZjNjMjE3OTk1MjE5MTBjYzI1ZGZlZDBjOCIsIm5iZiI6MTczMjgxODI4Ni44NzY0NTk0LCJzdWIiOiI2NzQ0Y2VmMmNjMWQ2OTk4NmJkOWU3NTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6cnjlAMaDbKA-hFqPodxLwSYzM8cYGAYZS0NYT8JZY4'
  }
};

fetch(urlElenco, optionsElenco)
  .then(res => res.json())
  .then(json => {
    var elenco = document.querySelector(".todosAtores")
    strElenco = "";
    for(let i = 0; i < json.cast.length; i++){
      strElenco+= `
              <div class="atores" width="150">
                <img src="https://image.tmdb.org/t/p/w500${json.cast[i].profile_path}"  alt="foto de atores">
                <h3>Nome: ${json.cast[i].name}</h3>
                <p>Departamento: ${json.cast[i].known_for_department}</p>
              </div>`
    }

    elenco.innerHTML = strElenco;
    console.log(json)
  })
  .catch(err => console.error(err));