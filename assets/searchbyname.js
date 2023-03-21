var inputSearch = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var catSearch = document.getElementById("user-inputs")

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

		}
	}
	








	
}


searchBtn.addEventListener('click', getAnimalInfo);
  
