console.log("connection test")

const submitButton = document.getElementById("submit-button");
const searchBarInput = document.getElementById("search-bar-input");
const apiTestSection = document.getElementById("API-response-test-section");
const checkboxShooter = document.getElementById("shooter");
const checkboxFantasy = document.getElementById("fantasy");
const gameDisplayInformation = document.querySelectorAll(".game-display-information")

const checkboxSection = document.querySelector(".checkbox-section")





// const fetchgamereleasedate = async (event) => {
//   event.preventDefault();

//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
//       'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
//   }
// }
//   try{
// response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date', options)
// data = await response.json();
// console.log(data);
// } catch (error){
//   apiTestSection.innerHTML = '';
        
//   let p = document.createElement("p");
//   p.innerText = `Sorry, we couldn't find a match!`;
//   apiTestSection.appendChild(p);
// }

// }


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
}

const apiurl = "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date";

async function getapi() {

  const response = await fetch(apiurl, options);

  var data = await response.json();
  // console.log(data);
  console.log(data[0])

  
  document.getElementById("carousel-item-1").innerHTML = `<p><img class="d-block w-100" src="${data[0].thumbnail}" alt="First slide"/></p>`
  document.getElementById("carousel-item-2").innerHTML = `<p><img class="d-block w-100" src="${data[1].thumbnail}" alt="First slide"/></p>`
  document.getElementById("carousel-item-3").innerHTML = `<p><img class="d-block w-100" src="${data[2].thumbnail}" alt="First slide"/></p>`
  
  var paragraph = document.getElementById("gametitle1");
  paragraph.textContent += data[0].title;

  var paragraph = document.getElementById("gametitle2");
  paragraph.textContent += data[1].title;

  var paragraph = document.getElementById("gametitle3");
  paragraph.textContent += data[2].title;

  var paragraph = document.getElementById("description1");
  paragraph.textContent += data[0].short_description;

  var paragraph = document.getElementById("description2");
  paragraph.textContent += data[1].short_description;

  var paragraph = document.getElementById("description3");
  paragraph.textContent += data[2].short_description;


  

  
}

getapi(apiurl)



