

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

//Search for a game
const getGameByName = async (event) => {
    event.preventDefault();

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }

    let url = `https://free-to-play-games-database.p.rapidapi.com/api/games`

    let searchInput = searchBarInput.value;

    try {
        response = await fetch(url, options);
        data = await response.json();

        let gameInformation = '';

        data.forEach(dataTitle => {
            if (dataTitle.title === searchInput) {
                console.log(`The game title is ${dataTitle.title}`)
                console.log(`The short description is: ${dataTitle.short_description}`)              
                console.log(`The game thumbnail is ${dataTitle.thumbnail}`);

                gameInformation += `
                <div class="game-display">
                    <img src='${dataTitle.thumbnail}' alt="image of the game searched">
                    <p>${dataTitle.title}</p>
                    <p>${dataTitle.short_description}</p>
                </div>
                `
                apiTestSection.innerHTML = gameInformation;
            } 
        })
    } catch (error) {
        console.log("This didn't work")
    }
}

//!Generating the checkboxes for each section
//^Generate Main category checkboxes

const mainCategoryArray = ['flight', 'racing', 'sailing', 'sports'];

generatedMainCategoryCheckboxes = '';

mainCategoryArray.forEach(genre => {
    generatedMainCategoryCheckboxes += `
    <li>
        <a class="dropdown-item" href="#">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${genre}" id="${genre}"/>
                <label class="form-check-label" for="${genre}">${genre}</label>
            </div>
        </a>
    </li>
     `
    document.querySelector(".main-category").innerHTML = generatedMainCategoryCheckboxes;
});


//^==========Generate Types Category checkboxes==========

const typesCategoryArray = ['action', 'action-rpg',
    'battle-royale', 'card',
    'fantasy',       'fighting',
    'martial-arts',  'open-world',
    'sandbox',       'sci-fi',
    'shooter',       'space',
    'strategy',      'survival',
    'turn-based',    'zombie'
  ]

generatedTypesCategoryCheckboxes ='';

typesCategoryArray.forEach(type => {
    generatedTypesCategoryCheckboxes += `
    <li>
        <a class="dropdown-item" href="#">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${type}" id="${type}"/>
                <label class="form-check-label" for="${type}">${type}</label>
            </div>
        </a>
    </li>
     `
    document.querySelector(".types-category").innerHTML = generatedTypesCategoryCheckboxes;
});


//^==========Generate Multiplayer Category checkboxes ==========

const multiplayerCategoryArray = ['social', 'moba', 'pvp', 'mmo', 'mmofps', 'mmotps', 'mmorts'];

generatedMultiplayerCategoryCheckboxes ='';

multiplayerCategoryArray.forEach(multiplayer => {
    generatedMultiplayerCategoryCheckboxes += `
    <li>
        <a class="dropdown-item" href="#">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${multiplayer}" id="${multiplayer}"/>
                <label class="form-check-label" for="${multiplayer}">${multiplayer}</label>
            </div>
        </a>
    </li>
     `
    document.querySelector(".multiplayer-category").innerHTML = generatedMultiplayerCategoryCheckboxes;
});


//^============Generate POV Category Checkboxes =========
const POVArray = ['first-person', 'third-person', 'top-down', 'side-scroller', '3d', '2d'];

generatedPOVCategoryCheckboxes = '';

POVArray.forEach(pov => {
    generatedPOVCategoryCheckboxes += `
    <li>
        <a class="dropdown-item" href="#">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${pov}" id="${pov}"/>
                <label class="form-check-label" for="${pov}">${pov}</label>
            </div>
        </a>
    </li>
     `
     document.querySelector(".POV-category").innerHTML = generatedPOVCategoryCheckboxes; 
})


//^==========Generate Random Category checkboxes==========
const randomCategoryArray = ['pve', 'pixel', 'voxel', 'tank', 'superhero', 'permadeath', 'anime', 'military', 'tower-defense', 'horror'];

generatedRandomCategoryCheckboxes = '';

randomCategoryArray.forEach(random => {
    generatedRandomCategoryCheckboxes +=
    `
    <li>
        <a class="dropdown-item" href="#">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${random}" id="${random}"/>
                <label class="form-check-label" for="${random}">${random}</label>
            </div>
        </a>
    </li>
    `
    document.querySelector(".random-category").innerHTML = generatedRandomCategoryCheckboxes;
});

//Function to fetch a list of games with the search bar selection (browser, pc, or all) plus the checked boxes
const fetchWithCheckBoxAndSearchBar = async (event) => {
    event.preventDefault();

    //These options must be included for all API requests
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }

    //Creating an array of all the checkboxes
    const allCheckboxesArray = document.querySelectorAll('input[type="checkbox"]');

    //Looping through each checkbox, looking for the checkboxes that are checked. I store those checkboxes that are checked to the new array "checkedCheckboxes"
    const checkedCheckboxes = Array.from(allCheckboxesArray).filter((checkbox) => {
        if (checkbox.checked) {
            console.log(checkbox)
            return checkbox.value;
        }
    });

    //I loop through "checkedCheckboxes" to get the value of each
    let finalCheckboxesArray = [];
    checkedCheckboxes.forEach(checkbox => {
        finalCheckboxesArray.push(checkbox.value)
    })

    //I make the list of checkbox values into a string
    const checkboxesAsAString = finalCheckboxesArray.toString();

    //Due to commas seperating each item in the string, I replace all the commas with a '.'
    //The remaining string is now ready to be passing into the fetch URL
    const checkboxValuesToAddToUrl = checkboxesAsAString.replaceAll(',', '.');

    //Getting the search bar value: browser, pc, or all.
    let userInputChoice = document.getElementById("search-bar");
    let userInputChoiceValue = userInputChoice.value;

    //If the user doesn't push anything, the default to the search bar is "all"
    if (userInputChoiceValue === '') {
        userInputChoiceValue = 'all';
    }

    //Where the magic happens
    try {
        response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${checkboxValuesToAddToUrl}&platform=${userInputChoiceValue}`, options);
        data = await response.json();
        console.log(data);

        //^Generate the rectangles for each game
        generateGameRow = '';

        data.forEach(data => {
            generateGameRow += `
            <div class="row">
                <div class="col column" id="scrollingEntryImg">
                    <img src='${data.thumbnail}'>
                </div>

                <div class="col column" id="scrollingEntryTitle">
                    <p>${data.title}<p/>
                </div>

                <div class="col column" id="scrollingEntryInfo">
                    <p>${data.short_description}</p>
                </div>
            </div>
            `
            document.getElementById("scrollingEntry").innerHTML = generateGameRow;
        })

    } catch (error) {
        //Racing and sailing should throw this error for testing purposes
        document.getElementById("scrollingEntry").innerHTML = ``;

        document.getElementById("scrollingEntry").innerHTML = `<p>Sorry, we couldn't find a match!</p>`;
    }   
}

document.getElementById("btn-browse").addEventListener('click', fetchWithCheckBoxAndSearchBar)

