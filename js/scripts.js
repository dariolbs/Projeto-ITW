function sound(){
    var snd = new Audio();
    snd.src = "audio/som.ogg";
    snd.onerror = function(e) {
        console.error(e);   
    }
    snd.play();
    snd.currentTime=0;
}

// Função para fazer um som e ir para outra página (não funciona)
function soundAndGo(url){
    sound()
    window.location=(url)
}

// Função sleep. Pára o programa por x milisegundos
const sleep = (ms) => {
  const end = new Date().getTime() + ms;
  while (new Date().getTime() < end) { /* do nothing */ }
}
