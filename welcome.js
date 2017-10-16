var hello = "Hello", date = new Date,
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Auguste', 'September', 'October', 'November', 'December'];
daysFR = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
monthsFR = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
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
