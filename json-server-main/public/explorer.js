function carregarConteudo(){
  var pesquisar = document.getElementById('pesquisar').value = "a";
  document.getElementById('btnPesquisar').click();
  var pesquisar = document.getElementById('pesquisar').value = ""
}

document.getElementById('btnPesquisar').addEventListener('click', function(e){
    e.preventDefault();
    var pesquisar = document.getElementById('pesquisar').value;
    const url = `https://api.themoviedb.org/3/search/tv?query=${pesquisar}&include_adult=false&language=pt-br&page=1`;
    const options = {
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWNlZmQ5ZjNjMjE3OTk1MjE5MTBjYzI1ZGZlZDBjOCIsIm5iZiI6MTczMjU2MjY3NC4wMiwic3ViIjoiNjc0NGNlZjJjYzFkNjk5ODZiZDllNzUzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.scLF94MdeBHfOcTCJIJakLpWCxGeVJjvviyfHF4L3HU'
    }
    };
    
    fetch(url, options)
    .then(res => res.json())
    .then(json => {
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
    document.getElementById('containerExplorer').innerHTML = str;
    })
    .catch(err => console.error(err));

})







/*

    */