const searchSuggestion=()=> {
  document.getElementById('search-result').style.display='block';
  document.getElementById('single-lyrics').style.display='none';
  const inputText = document.getElementById('input-text').value;
  //--validation is not fully completed, next time will do it
  if(inputText==="" || inputText==" "){
    alert("Please insert your Text");
  }else{
    getSuggestion(inputText);
  }
}

const getSuggestion = async input => {
  const response = await fetch(`https://api.lyrics.ovh/suggest/${input}`);
  const data = await response.json();
  let actualData = data.data;
  actualData = actualData.slice(0, 10);
  updateSuggestionItem(actualData);
}


const updateSuggestionItem = data => {  
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
      <div class="col-md-8">
        <h3 class="lyrics-name">${albumName}</h3>
        <p class="author lead">Album by <span>${artistName}</span></p>
      </div>
      <div class="col-md-2 text-md-right text-center">
        <button onclick="getLyrics('${albumName}','${artistName}')" class="btn btn-success">Get Lyrics</button>
      </div>
  </div>`;
    searchResult.appendChild(list); 
  }
  
}

const getLyrics=async (artist,title)=>{
  document.getElementById('search-result').style.display='none';
  document.getElementById('single-lyrics').style.display='block';
  const response=await fetch(`https://api.lyrics.ovh/v1/${title}/${artist}`);
  const data=await response.json();  
  updateLyrics(data,artist,title);
}

const updateLyrics=(data,artist,title)=>{
  console.log("hit")
  let lyricsText="";
  if(data.lyrics==undefined){
    lyricsText="No lyrics found";
  }else{
    lyricsText=data.lyrics;
  }
  const singleLyrics=document.getElementById('single-lyrics');
  singleLyrics.innerHTML="";
  const showLyrics=document.createElement('div');
  showLyrics.innerHTML=
  `<h2 class="text-success mb-4">${title} - ${artist}</h2>
  <pre id="lyric" class="text-white">${lyricsText}</pre>`
  singleLyrics.appendChild(showLyrics);
}
