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

//This array is just an overview of all the types of games. The array that is used for the fetch requests are broken up in the section below
const arrayOfGenres = ['shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'];

//!Debounce function
const debounce = (funcToApply) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
        timer = setTimeout(() => { 
            (funcToApply).apply(this, args); 
        }, 1000);
    };
  }
const saveInput = () => {
    // console.log(document.getElementById("search-bar").value);
    getGameByNameDebounce();
}

//This is the variable you will throw in on keyup
const processChange = debounce(() => saveInput());

document.getElementById("search-bar-for-game").addEventListener('keyup', processChange);


//Debounce Function With User Input
const getGameByNameDebounce = async (event) => {
    console.log("Debounce function firing")

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }

    let url = `https://free-to-play-games-database.p.rapidapi.com/api/games`

    let userInputChoiceValue = document.getElementById("search-bar-for-game").value;
    console.log(userInputChoiceValue)

    try {
        response = await fetch(url, options);
        data = await response.json();
        console.log(data)

        let gameInformation = '';

        //This is just a check to see if any day was discovered the in following forEach loop. If something was found, the count goes up. If nothing was found, the count returns to 0 and the lone if statement is fired
        count = 0;

        if (userInputChoiceValue !== '') {
            data.forEach(data => {
                if (data.title.includes(userInputChoiceValue)) {
                    console.log(`The game title is ${data.title}`)
                    console.log(`The short description is: ${data.short_description}`)              
                    console.log(`The game thumbnail is ${data.thumbnail}`);
    
                    gameInformation += `
                    <div class="game-display">
                        <a href='${data.game_url}'><img src='${data.thumbnail}' alt="image of the game searched"></a>
                        <a href='${data.game_url}'><p>${data.title}</p></a>
                        <p>${data.short_description}</p>
                    </div>
                    `
                    document.getElementById("API-response-test-section").innerHTML = gameInformation;
                    count ++;
                }
            })
        }
        //If nothing is found in the for loop
        if (count === 0) {
            document.getElementById("API-response-test-section").innerHTML = ``;

            document.getElementById("API-response-test-section").innerHTML = `<p>Sorry, we couldn't find a match!</p>`;
        }
        //The count is reset to 0 for the next search
        count = 0;
        
    } catch (error) {
        document.getElementById("API-response-test-section").innerHTML = ``;

        document.getElementById("API-response-test-section").innerHTML = `<p>Sorry, we couldn't find a match!</p>`;
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
];

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

const multiplayerCategoryArray = [
    'mmo', 'mmofps',
    'mmorts', 'mmotps',
    'moba',   'pvp',
    'social'
];

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
const POVArray = [
    '2d',
    '3d',
    'first-person',
    'side-scroller',
    'third-person',
    'top-down'
];

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
const randomCategoryArray = [
    'anime',
    'horror',
    'military',
    'permadeath',
    'pixel',
    'pve',
    'superhero',
    'tank',
    'tower-defense',
    'voxel'
];

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

    document.getElementById("API-response-test-section").innerHTML = ``;

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

    //Due to commas separating each item in the string, I replace all the commas with a '.'
    //The remaining string is now ready to be passing into the fetch URL
    const checkboxValuesToAddToUrl = checkboxesAsAString.replaceAll(',', '.');

    //Getting the search bar value: browser, pc, or all.
      // let userInputChoice = document.getElementById("search-bar");
      let userInputChoiceValue = document.getElementById("search-bar").value;
      console.log(`This is the userInputChoiceValue: ${userInputChoiceValue}`)

    //If the user doesn't push anything, the default to the search bar is "all"
    if (userInputChoiceValue === '') {
        userInputChoiceValue = 'all';
    }

    if (checkboxValuesToAddToUrl === '') {
        document.getElementById("API-response-test-section").innerHTML = ``;

        document.getElementById("API-response-test-section").innerHTML = `<p>Please select at least one checkbox option, or search for a title by name in the second search bar</p>`;
    } else {
        try {
            response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${checkboxValuesToAddToUrl}&platform=${userInputChoiceValue}`, options);
            data = await response.json();
            console.log(data);
            // console.log(data.thumbnail)
    
            //^Generate the rectangles for each game
            generateGameRow = '';
    
            data.forEach(data => {
                console.log(data.title)
                console.log(data.thumbnail)
                console.log(data.short_description)
                
                generateGameRow += `
                <div class="row">
                    <div class="col column" id="scrollingEntryImg">
                        <a href='${data.game_url}'><img src='${data.thumbnail}' alt="image of the game searched"></a>
                    </div>
    
                    <div class="col column" id="scrollingEntryTitle">
                    <a href='${data.game_url}'><p>${data.title}</p></a>
                    </div>
    
                    <div class="col column" id="scrollingEntryInfo">
                        <p>${data.short_description}</p>
                    </div>
                </div>
                `
                document.getElementById("API-response-test-section").innerHTML = generateGameRow;
            //     console.log(generateGameRow)
            })
    
        } catch (error) {
            //Racing and sailing should throw this error for testing purposes
            document.getElementById("API-response-test-section").innerHTML = ``;
    
            document.getElementById("API-response-test-section").innerHTML = `<p>Sorry, we couldn't find a match!</p>`;
        }   
    
    }

    //Where the magic happens
    }

document.getElementById("btn-submit").addEventListener('click', fetchWithCheckBoxAndSearchBar)

