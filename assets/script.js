var inputSearch = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var catSearch = document.getElementById("user-inputs")
var breedbtn = document.getElementById('search-breed-btn');

const breedList = document.querySelector('.breed-list');

//var url = "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng";

function getAnimalInfo() {
  // gets the value from the users
  var val = inputSearch.value;
  fetch("https://api.petfinder.com/v2/oauth2/token", {
	method: "POST",
	body: "grant_type=client_credentials&client_id=" + "iyASSkqNhfW2rvr2TV5kPL14hKyiiWOIPob4GhskCaCXbj09j7" + "&client_secret=" + "ub2ylxrmqhZxdnJGotplANDsuWvrtkxzvJcXLju7",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	}
}).then(function (resp) {
	// Return the response as JSON
	return resp.json();
}).then(function (data) {
	// Log the API data
	console.log("token", data);
	// Return a second API call
	// This one uses the token we received for authentication
	return fetch("https://api.petfinder.com/v2/animals?name=" + val + "&limit=10" , {
		headers: {
			"Authorization": data.token_type + ' ' + data.access_token,
			"Content-Type": "application/x-www-form-urlencoded"
		}
	});
}).then(function (resp) {
	// Return the API response as JSON
	return resp.json();
}).then(function (data) {
  // Log the pet data
  console.log(data);
  displayAnimalInfo(data);
  

}).catch(function (err) {
	// Log any errors
	console.log("something went wrong", err);
});
  
}


function displayAnimalInfo(data){

	//displays dogs info

	for (var i = 0; i < data.animals.length; i++){
		var animal = data.animals[i];
		
		if ((animal.type == "Cat") || (animal.type == "Dog")){
			var animalName = animal.name;
			var animalDiv = document.createElement("h1");
			animalDiv.innerHTML = "Name: " + animalName;
			catSearch.appendChild(animalDiv);

			var animalBreed = animal.breeds.primary;
			var breedDiv = document.createElement("p");
			breedDiv.innerHTML = "Breed: " + animalBreed;
			catSearch.appendChild(breedDiv);

			if (animal.photos.length != 0) {
				var animalImage = animal.photos[0].medium;
				var imgDiv = document.createElement("img");
				imgDiv.src = animalImage;
				catSearch.appendChild(imgDiv);
			}
			
			var animalAge = animal.age;
			var animalAgeDiv = document.createElement("p");
			animalAgeDiv.innerHTML = "Age: " + animalAge;
			catSearch.appendChild(animalAgeDiv);

			var animalStatus = animal.status;
			var statusDiv = document.createElement("p");
			statusDiv.innerHTML = "Status: " + animalStatus;
			catSearch.appendChild(statusDiv);

			var animalGender = animal.gender;
			var GenderDiv = document.createElement("p");
			GenderDiv.innerHTML = "Gender: " + animalGender;
			catSearch.appendChild(GenderDiv);

			var animalAttributes = animal.attributes;
			var attributesDiv = document.createElement("p");
			if (animalAttributes.house_trained = true) {
				attributesDiv.innerHTML = "House-trained: Yes";
				catSearch.appendChild(attributesDiv);
			} else if (animalAttributes.house_trained = false) {
				attributesDiv.innerHTML = "House-trained: No";
				catSearch.appendChild(attributesDiv);
			} else {
				attributesDiv.innerHTML = "House-trained: unknown";
				catSearch.appendChild(attributesDiv);
			}
			
			var animalAttributes = animal.attributes;
			var attributesDiv = document.createElement("p");
			if (animalAttributes.shots_current = true) {
				attributesDiv.innerHTML = "Shots Current: Yes"
				catSearch.appendChild(attributesDiv);
			} else if (animalAttributes.shots_current = false) {
				attributesDiv.innerHTML = "Shots Current: No";
				catSearch.appendChild(attributesDiv);
			} else {
				attributesDiv.innerHTML = "Shots Current: unknown";
				catSearch.appendChild(attributesDiv);
			}

			var animalAttributes = animal.attributes;
			var attributesDiv = document.createElement("p");
			if (animalAttributes.spayed_neutered = true) {
				attributesDiv.innerHTML = "Spayed / Neutered: Yes";
				catSearch.appendChild(attributesDiv);
			} else if (animalAttributes.spayed_neutered = false) {
				attributesDiv.innerHTML = "Spayed / Neutered: No";
				catSearch.appendChild(attributesDiv);
			} else {
				attributesDiv.innerHTML = "Spayed / Neutered: unknown";
				catSearch.appendChild(attributesDiv);
			}
			
			var animalDescription = animal.description;
			var descriptionDiv = document.createElement("p");
			descriptionDiv.innerHTML = animalDescription;
			catSearch.appendChild(descriptionDiv);

			var animalContact = animal.contact;
			var contactDiv = document.createElement("p");
			contactDiv.innerHTML = "Email: " + animalContact.email;
			catSearch.appendChild(contactDiv);

			var animalContact = animal.contact;
			var contactDiv = document.createElement("p");
			contactDiv.innerHTML = "Phone: " + animalContact.phone;
			catSearch.appendChild(contactDiv);
	
		}
	}
	

	
}

function getAllBreeds(){
    fetch('https://api.thedogapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
        // Loop through the list of breeds and create an options list
        data.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed.name;
            option.setAttribute("data-id", breed.id);
            breedList.appendChild(option);
        });
    })
    .catch(error => console.log(error));

}

getAllBreeds()

function showField(fieldId) {
	
	var field = document.getElementById(fieldId);
	
	
	if (fieldId === "user-inputs") {
		field.style.display = "block";
		document.getElementById('breed-display').innerHTML=''
		document.getElementById('user-inputs2').style.display='none'
	}
	if(fieldId === "user-inputs2"){
		
		document.getElementById('user-inputs').style.display='none'
		field.style.display='block'
	}
}



searchBtn.addEventListener('click', getAnimalInfo);
// Add an event listener to the breed search form
breedbtn.addEventListener('click', event => {
    event.preventDefault();
    var inputElement = document.getElementById("search-breed-input");
    var datalistElement = document.getElementById("breed-list");
    var breedValue = undefined;
    var breedId ='';
    for (var i = 0; i < datalistElement.options.length; i++) {
        var option = datalistElement.options[i];
        if (option.value === inputElement.value) {
        breedValue = option;
        // get selected id
        breedId = breedValue.getAttribute("data-id");
        break;
        }
    }
    
    if (breedValue) {
        // alert(breedValue.value + breedId);
        console.log();
        getBreedDetails(breedId,breedValue.value);
    }

	inputElement.value=''
	
    
});

async function getBreedDetails(breedId,breedValue) {
    const url = `https://api.thedogapi.com/v1/breeds/${breedId}`;

    
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Breed not found");
        }

        const breedData = await response.json()
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