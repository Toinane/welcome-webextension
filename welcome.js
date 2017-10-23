var hello = "Hello", date = new Date,
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguste', 'September', 'October', 'November', 'December'];
daysFR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
monthsFR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

var linkHTML = '', cardHTML = '', settings = `localhost => http://localhost
github => https://github.com
MDN => https://developer.mozilla.org/fr/
Google Maps => https://www.google.fr/maps
####
Youtube => https://youtube.com => #c4302b
6play => https://6play.fr => #264365
tweetdeck => https://tweetdeck.twitter.com => #2b7bb9`;

document.querySelector('.date').innerHTML = date.getDate()+' '+days[date.getDay()]+' '+months[date.getMonth()];
if(date.getHours()>17||date.getHours()<7){
   hello = 'Bonsoir';
}
function changeTime(){
   date = new Date;
   if(date.getHours()<10 && date.getMinutes()<10){
      document.querySelector('h2').innerHTML = '0'+date.getHours()+':0'+date.getMinutes();
   }
   else if(date.getHours()>10 && date.getMinutes()<10){
      document.querySelector('h2').innerHTML = date.getHours()+':0'+date.getMinutes();
   }
   else if(date.getHours()<10 && date.getMinutes()>10){
      document.querySelector('h2').innerHTML = '0'+date.getHours()+':'+date.getMinutes();
   }
   else{
      document.querySelector('h2').innerHTML = date.getHours()+':'+date.getMinutes();
   }
   setTimeout(changeTime, 1000);
}
changeTime();
document.querySelector('#open-note').onclick = function(){
   document.querySelector('#note-cursor').classList.toggle('active');
   document.querySelector('#note').classList.toggle('active');
}
if(localStorage.getItem("note")){
   document.getElementById('note').value = localStorage.getItem("note");
}
document.getElementById('note').onkeyup = function(e){
   localStorage.setItem("note", this.value);
}
document.getElementById('settings').onkeyup = function(e){
   localStorage.setItem("settings", this.value);
}
document.getElementById('edit').onclick = function(){
  document.getElementById('settings').classList.toggle('active');
}
if(localStorage.getItem('settings')){
  settings = localStorage.getItem('settings');
}
document.getElementById('settings').value = settings;
settings = settings.split('####');

var links = settings[0];
var cards = settings[1];

links = links.split('\n');
cards = cards.split('\n');

for(var link of links){
  link = link.split('=>');
  if(link[1]){
    linkHTML += `<li><a href="${link[1]}">${link[0]}</a></li>`;
  }
}
document.getElementById('link').innerHTML = linkHTML;

for(var card of cards){
  card = card.split('=>');
  if(card[1]){
    cardHTML += `<a href="${card[1]}" style="border: 1px solid ${card[2]}; background: ${card[2]}">${card[0]}</a>`;
  }
}
document.getElementById('card').innerHTML = cardHTML;

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://randomuser.me/api/?inc=name,login" , true);
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                var name = JSON.parse(xhr.responseText);
                document.querySelector('h1').innerHTML = hello+' '+name.results[0].name.first+'.';
            } else {
                console.log('something bad happened');
            }
    }
};
xhr.send(null);
