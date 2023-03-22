fetch(‘https://api.petfinder.com/v2/oauth2/token’, {
	method: ‘POST’,
	body: ‘grant_type=client_credentials&client_id=’ + ‘iyASSkqNhfW2rvr2TV5kPL14hKyiiWOIPob4GhskCaCXbj09j7’ + ‘&client_secret=’ + ‘ub2ylxrmqhZxdnJGotplANDsuWvrtkxzvJcXLju7’,
	headers: {
		‘Content-Type’: ‘application/x-www-form-urlencoded’
	}
}).then(function (resp) {
	// Return the response as JSON
	return resp.json();
}).then(function (data) {
	// Log the API data
	console.log(‘token’, data);
	// Return a second API call
	// This one uses the token we received for authentication
	return fetch(‘https://api.petfinder.com/v2/animals?name=max’, {
		headers: {
			‘Authorization’: data.token_type + ' ' + data.access_token,
			‘Content-Type’: ‘application/x-www-form-urlencoded’
		}
	});
}).then(function (resp) {
	// Return the API response as JSON
	return resp.json();
}).then(function (data) {
	// Log the pet data
	console.log(‘pets’, data);
}).catch(function (err) {
	// Log any errors
	console.log(‘something went wrong’, err);
});









