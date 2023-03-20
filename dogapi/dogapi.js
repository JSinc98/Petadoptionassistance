// DOM elements

const breedSearchForm = document.querySelector('#search-form');
const breedList = document.querySelector('.breed-list');

var searchHistoryEl = document.querySelector("#search-history");
// Variables
var searchHistory = [];
var breeds = JSON.parse(localStorage.getItem('breeds')) || [];

function searchHandler(event) {
    event.preventDefault();
    const searchInputEl = document.querySelector("#search-input");
    const breed = searchInputEl.value.trim();

    if (!breed) {
        return;
    }

    getBreedDetails(breed);
    searchInputEl.value = "";
}

// Add an event listener to the breed search form
breedSearchForm.addEventListener('submit', event => {
    event.preventDefault();
    const breedId = breedList.value;
    const breedValue = breedList.options[breedList.selectedIndex].text
    getBreedDetails(breedId,breedValue);
});

async function getBreedDetails(breedId,breedValue) {
    const url = `https://api.thedogapi.com/v1/breeds/${breedId}`;

    
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Breed not found");
        }

        const breedData = await response.json()

        saveBreed(breedId,breedValue);
        displayBreedDetail(breedData);
        getBreedImage(breedId)

        
   
}


function getBreedImage(breedId){
    const breedimage = document.getElementById("breed-image");
    fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${breedId}`)
        .then(response => response.json())
        .then(data => {
            const image = data[0];
            breedimage.src = image.url;
        })
}

function displayBreedDetail(data) {
    console.log(data);
    const breed_name = document.getElementById("breed-name");
    const breed_temperament = document.getElementById("breed-temperament");
    const breed_life_span = document.getElementById("breed-life-span");
    const breed_weight = document.getElementById("breed-weight");
    const breed_height = document.getElementById("breed-height");
    const breed_bred_for = document.getElementById("breed-bred-for");
    const breed_breed_group = document.getElementById("breed-breed-group");
    breed_name.textContent = `${data.name} `;
    breed_temperament.textContent = `${data.temperament} `;
    breed_life_span.textContent = `${data.life_span} `;
    breed_weight.textContent = `Weight ${data.weight.metric} `;
    breed_height.textContent = `Height ${data.height.metric} `;
    breed_bred_for.textContent = `${data.bred_for} `;
    breed_breed_group.textContent = `${data.breed_group} `;
}

function saveBreed(breedId,breedValue) {
    let breeds = JSON.parse(localStorage.getItem("breeds")) || [];
    // check object if breedvalue exist
    
    var breed =breeds.find(function(breed){
        
        return breed.breedId === breedId
    })
    if(!breed){
        // check for lowercase
        breed = breeds.find(function(breed){
            return breed.breedValue === breedValue.toLowerCase()
        })
        breeds.push({id:breedId,value:breedValue.toLowerCase()});
        localStorage.setItem("breeds", JSON.stringify(breeds));
        displaySearchHistory();
    } 
    
}


function displaySearchHistory() {
    var history = document.querySelector("#history-list");
    history.innerHTML = "";

    var breeds = JSON.parse(localStorage.getItem("breeds")) || [];

    breeds.reverse();
    for (var i = 0; i <= breeds.length -1; i++) {
        var breed = breeds[i];

        var liEl = document.createElement("li");
        liEl.classList.add("list-group-item", "history-item");
        liEl.textContent = breed.value;
        liEl.setAttribute("data-breed", breed.id);
        liEl.setAttribute("data-breedValue", breed.value);
        liEl.addEventListener("click", function () {
            getBreedDetails(this.getAttribute("data-breed"),this.getAttribute('data-breedValue'));
        });

        history.appendChild(liEl);
    }
}

function getAllBreeds(){
    fetch('https://api.thedogapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        // Loop through the list of breeds and create an options list
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.id;
            option.textContent = breed.name;
            breedList.appendChild(option);
        });
    })
    .catch(error => console.log(error));

}

getAllBreeds()

function historyHandler(event) {
    // Get the clicked element
    let element = event.target;

    // If the clicked element is a button with the 'city-btn' class
    if (element.matches(".city-btn")) {
        // Get the city name from the button's data attribute
        let city = element.getAttribute("data-breed");

        getBreedDetails(city);
    }
}


displaySearchHistory();
