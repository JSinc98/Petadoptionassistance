var inputSearch = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var catSearch = document.getElementById("user-inputs")
var animalContainer = document.createElement("div");
animalContainer.classList.add('animal-desc')

catSearch.appendChild(animalContainer)



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

	//displays dogs and cat info
	 
	animalContainer.innerHTML = "";

	for (var i = 0; i < data.animals.length; i++){
		var singledesc= document.createElement('div')
		singledesc.classList.add('single-desc')
		var animal = data.animals[i];
		
		if ((animal.type == "Cat") || (animal.type == "Dog")){
			if (animal.photos.length != 0) {
				var animalImage = animal.photos[0].medium;
				var imgDiv = document.createElement("img");
				imgDiv.src = animalImage;
				singledesc.appendChild(imgDiv);
			}

			var animalName = animal.name;
			var animalDiv = document.createElement("p");
			animalDiv.innerHTML = "Name: " + animalName;
			singledesc.appendChild(animalDiv);

			var animalBreed = animal.breeds.primary;
			var breedDiv = document.createElement("p");
			breedDiv.innerHTML = "Breed: " + animalBreed;
			singledesc.appendChild(breedDiv);

			
			
			var animalAge = animal.age;
			var animalAgeDiv = document.createElement("p");
			animalAgeDiv.innerHTML = "Age: " + animalAge;
			singledesc.appendChild(animalAgeDiv);

			var animalStatus = animal.status;
			var statusDiv = document.createElement("p");
			statusDiv.innerHTML = "Status: " + animalStatus;
			singledesc.appendChild(statusDiv);

			var animalGender = animal.gender;
			var GenderDiv = document.createElement("p");
			GenderDiv.innerHTML = "Gender: " + animalGender;
			singledesc.appendChild(GenderDiv);

			var animalAttributes = animal.attributes;
			var attributesDiv = document.createElement("p");
			if (animalAttributes.house_trained = "true") {
				attributesDiv.innerHTML = "House-trained: Yes";
				singledesc.appendChild(attributesDiv);
			} else if (animalAttributes.house_trained = false) {
				attributesDiv.innerHTML = "House-trained: No";
				singledesc.appendChild(attributesDiv);
			} else {
				attributesDiv.innerHTML = "House-trained: unknown";
				singledesc.appendChild(attributesDiv);
			}
			
			var animalAttributes = animal.attributes;
			var attributesDiv = document.createElement("p");
			if (animalAttributes.shots_current = "true") {
				attributesDiv.innerHTML = "Shots Current: Yes"
				singledesc.appendChild(attributesDiv);
			} else if (animalAttributes.shots_current = false) {
				attributesDiv.innerHTML = "Shots Current: No";
				singledesc.appendChild(attributesDiv);
			} else {
				attributesDiv.innerHTML = "Shots Current: unknown";
				singledesc.appendChild(attributesDiv);
			}

			var animalAttributes = animal.attributes;
			var attributesDiv = document.createElement("p");
			if (animalAttributes.spayed_neutered = "true") {
				attributesDiv.innerHTML = "Spayed / Neutered: Yes";
				singledesc.appendChild(attributesDiv);
			} else if (animalAttributes.spayed_neutered = false) {
				attributesDiv.innerHTML = "Spayed / Neutered: No";
				singledesc.appendChild(attributesDiv);
			} else {
				attributesDiv.innerHTML = "Spayed / Neutered: unknown";
				singledesc.appendChild(attributesDiv);
			}
			
			var animalDescription = animal.description;
			var descriptionDiv = document.createElement("p");
			descriptionDiv.innerHTML = animalDescription;
			singledesc.appendChild(descriptionDiv);

			var animalContact = animal.contact;
			var contactDiv = document.createElement("p");
			contactDiv.innerHTML = "Email: " + animalContact.email;
			singledesc.appendChild(contactDiv);

			var animalContact = animal.contact;
			var contactDiv = document.createElement("p");
			contactDiv.innerHTML = "Phone: " + animalContact.phone;
			singledesc.appendChild(contactDiv);

			// catSearch.append(singledesc);
			catSearch.appendChild(singledesc)
	
			catSearch.classList.add("Result");
			 
			animalContainer.appendChild(singledesc)
		}
		 
	}



	
}




searchBtn.addEventListener('click', getAnimalInfo);
// Add an event listener to the breed search form
