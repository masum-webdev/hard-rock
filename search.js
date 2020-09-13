const searchSuggestion=()=> {
  const inputText = document.getElementById('input-text').value;
  getSuggestion(inputText);
}

const getSuggestion = async input => {
  const response = await fetch(`https://api.lyrics.ovh/suggest/${input}`);
  const data = await response.json();
  let actualData = data.data;
  actualData = actualData.slice(0, 10);
  updateItem(actualData);
}


const updateItem = data => {  
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML='';
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const albumCover=item.album.cover_medium;
    const albumName=item.album.title;
    const artistName=item.artist.name;    
    const list = document.createElement('div');
    let test="test";
    list.innerHTML = `
  <div class="single-result row align-items-center my-3 p-3">
      <div class="col-md-2">
        <img id="album-cover" src="${albumCover}" alt="">
      </div>
      <div class="col-md-7">
        <h3 class="lyrics-name">${albumName}</h3>
        <p class="author lead">Album by <span>${artistName}</span></p>
      </div>
      <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${albumName}','${artistName}')" class="btn btn-success">Get Lyrics</button>
      </div>
  </div>`;
    searchResult.appendChild(list); 
  }
  
}

const getLyrics=async (artist,title)=>{
  const response=await fetch(`https://api.lyrics.ovh/v1/${title}/${artist}`);
  const data=await response.json();
  console.log(data);
}
