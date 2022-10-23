let city=document.querySelector(".city");
let temp=document.querySelector(".temp");
let feelTemp=document.querySelector(".feeltemp");
let wind=document.querySelector(".wind");
let weather=document.querySelector(".weather");
let btn=document.querySelector(".city-btn");

if("geolocation" in navigator) {

    navigator.geolocation.watchPosition((position) => {
        const url="https://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=9efb8b03e01f0cc6770c1be28910f123&units=metric&lang=fr";
//api pour avoir la meteo avec les cordoonnée gps
    let requete = new XMLHttpRequest(); // Creation d'une nouvelle requete
    requete.open('GET', url); // recuperation de données avec la methode get sur la const url
    requete.responseType = 'json'; // Format données souhaité en json
    requete.send(); // Envoi de la requete
  
    // Dès qu'on reçoit une réponse, cette fonction est executée
    requete.onload = function() {
      //Si la requete c'est bien derouler
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let value = requete.response; //Stocke la reponse de la requete
          
          //ajout des valeurs dans la page html
          temp.textContent = value.main.temp +" °C";
           city.textContent      = value.name;
           feelTemp.textContent= value.main.feels_like +" °C";
           wind.textContent=value.wind.speed+"km/h"
           weather.textContent=value.weather[0].description;
          
          
        }
        //sinon la requete a echouer
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }

    },findWeather("paris")); //Parametre error a appeler dans le cas ou la geolocation n'est pas activer



}


//Creation evenement sur le bouton

btn.addEventListener("click", ()=> {


let choice = prompt("Dans quelle ville souhaitez vous conaitre la metéo ?");

findWeather(choice); //appel fonction quienvoie une requette a l'api pour une ville specifique

}

);


function findWeather(cityChoice)
{
    const url="https://api.openweathermap.org/data/2.5/weather?q="+cityChoice+"&appid=9efb8b03e01f0cc6770c1be28910f123&units=metric&lang=fr"; 
// Api pour avoir la meteo d'une ville
    let requete = new XMLHttpRequest(); 
    requete.open('GET', url); 
    requete.responseType = 'json'; 
    requete.send(); 
  
 
    requete.onload = function() {
      if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
          let value = requete.response;
          
          temp.textContent = value.main.temp +" °C";
           city.textContent      = value.name;
           feelTemp.textContent= value.main.feels_like +" °C";
           wind.textContent=value.wind.speed+"km/h"
           weather.textContent=value.weather[0].description;
        
          
        }
        else {
          alert('Un problème est intervenu, merci de revenir plus tard.');
        }
      }
    }
}