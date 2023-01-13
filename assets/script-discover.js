console.log("connection test")

const submitButton = document.getElementById("submit-button");
const searchBarInput = document.getElementById("search-bar-input");
const apiTestSection = document.getElementById("API-response-test-section");
const checkboxShooter = document.getElementById("shooter");
const checkboxFantasy = document.getElementById("fantasy");
const gameDisplayInformation = document.querySelectorAll(".game-display-information")

const checkboxSection = document.querySelector(".checkbox-section")


//! REQUIREMENTS FOR ANY FETCHING
//& Options that work and are needed for any type of request
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
// 		'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
// 	}
// };

// See https://rapidapi.com/digiwalls/api/free-to-play-games-database for specific url requests

const arrayOfGenres = ['shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];

arrayOfGenres.sort();

//Generate checkboxes

generatedCheckboxes = '';

// arrayOfGenres.forEach(genre => {
//     generatedCheckboxes += `
//     <div class=" col-3 form-check">
//         <input class="form-check-input" type="checkbox" value="${genre}" id="${genre}">
//         <label class="form-check-label" for="${genre}">
//             ${genre}
//         </label>
//     </div>
//     `
//     checkboxSection.innerHTML = generatedCheckboxes;
// });

const arrayOfCheckboxes = document.querySelectorAll('input[type="checkbox"]');

const fetchWithCheckBoxAndSearchBar = async (event) => {
    event.preventDefault();

    //?Reset the search results
    // checkboxSection.innerText = '';


    //These options must be included 
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }

    //loop through "arrayOfCheckboxes" to find those that are checked

    console.log(arrayOfCheckboxes)

    const checkedCheckboxes = Array.from(arrayOfCheckboxes).filter((checkbox) => {
        if (checkbox.checked) {
            console.log(checkbox)
            return checkbox.value;
        }
    });
    
    console.log(checkedCheckboxes);

    let finalCheckboxesArray = [];
    checkedCheckboxes.forEach(checkbox => {
        finalCheckboxesArray.push(checkbox.value)
    })

    console.log(finalCheckboxesArray);

    const checkboxesAsAString = finalCheckboxesArray.toString();

    const checkboxValuesToAddToUrl = checkboxesAsAString.replace(',', '.');
    console.log(checkboxValuesToAddToUrl)
    
    try {
        response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${checkboxValuesToAddToUrl}&platform=pc`, options);
        data = await response.json();
        console.log(data);

        let generateRows = '';
        data.forEach(data => {
            // let p = document.createElement("p");
            // p.innerText = data.title;
            // apiTestSection.appendChild(p);
            generateRows +=
            `<div class="col-4 game-display-information">
                <a href="${data.game_url}" target="_blank">${data.title}
             </div>
            `
            apiTestSection.innerHTML = generateRows;
        })
    } catch (error) {
        //Racing and zombie should throw this error

        apiTestSection.innerHTML = '';
        
        let p = document.createElement("p");
        p.innerText = `Sorry, we couldn't find a match!`;
        apiTestSection.appendChild(p);
    }   
}

// document.getElementById("submit-button").addEventListener('click', fetchWithCheckBoxAndSearchBar);