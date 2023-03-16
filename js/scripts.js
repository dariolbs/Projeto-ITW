function sound(){
    var snd = new Audio();
    snd.src = "audio/som.ogg";
    snd.onerror = function(e) {
        console.error(e);   
    }
    snd.play();
}