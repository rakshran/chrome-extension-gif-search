
// function to enable the press enter to search functionality
document.getElementById('searchTermInput').addEventListener('keydown', function onEvent(event) {
    if (event.key === 'Enter') {
        document.getElementById("button").click();
    }
});

//main function call
document.getElementById('button').addEventListener('click',getGIF);

var SECRET_API_KEY = config.SECRET_API_KEY;

//define the main function
function getGIF(){

	//extract the search term value
	var searchTerm = document.getElementById('searchTermInput').value;
	
	//function to generate a random integer between two integers min and max
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
      };


	//define a new variable xhr for making an XMLHttpRequest
	var xhr = new XMLHttpRequest();


	//url for the API call - include the search term to get the desired results
    GIFurl = 'https://api.giphy.com/v1/gifs/search?api_key='+SECRET_API_KEY+'='+searchTerm+'&limit=30&offset=0&rating=g&lang=en';


	//defining the call structure
	xhr.open('GET',GIFurl, true);


	//defining what will happen when the result is fetched from the API and the results are loading
	xhr.onload = function() {
		if(this.status == 200){

			//parsing the JSON response
			gif = JSON.parse(this.responseText);

			//generating a random number to randomly throw one of the 30 results that we have fetched from the API
            randomNumber = getRandomInt(1,30);


			//defining the html elements for output - gif, show me something else button and the copy link button			
			var output_gif = '<iframe id="myiFrame" src="'+gif['data'][randomNumber]['embed_url']+'"></iframe><br>';
			var output_showMeSomethingElse = '<button>Show me something else!</button>';
			var output_copyLink = '<br><br><button>Copy link</button><br>';


			//define the variable shareURL for using it later to enable the copy link for sharing functionality
			var shareURL = gif['data'][randomNumber]['url'];
			//shareURL.setAttribute('id','shareURLID')
			shareURL.id = 'shareURLID';	
		}

		
		//assigning the HTML elements their relevant values
		document.getElementById('gif').innerHTML = output_gif;
		document.getElementById('showMeSomethingElse').innerHTML = output_showMeSomethingElse;
		document.getElementById('copyLink').innerHTML = output_copyLink;


		//defining the event and function for the copy link url
		document.getElementById('copyLink').addEventListener('click',copyText);
		function copyText(){


		//click to copy only works with textarea or input HTML elements - creating the element here
		var linkToBeCopied = document.createElement('input');


		//creating the id for the HTML element for easy manipulation - the random # generator ensures unique id creation
		var shareURLID = 'shareURL'+randomNumber+getRandomInt(1,1000);

		
		//the created input element is set to readonly and positioned out of the visible screen
		linkToBeCopied.setAttribute('id', shareURLID);
		linkToBeCopied.setAttribute('readonly','');
		linkToBeCopied.style.position = 'absolute';   		    
		linkToBeCopied.style.left = '-9999px'; 
		document.body.appendChild(linkToBeCopied);

		
		//actual copying action
		document.getElementById(shareURLID).value=shareURL;
		copyText = document.getElementById('shareURLID');
		linkToBeCopied.select();
		document.execCommand("copy");
		document.getElementById('copyLink').innerHTML = '<br><br><button style="background-color:white">Copied</button><br>';
		

		};

	

	}


	//sending the request to server to fetch the value from the API
	xhr.send();
	
	
	//event listener for show me something else button - recursive function call because same action is to be repeated
	document.getElementById('showMeSomethingElse').addEventListener('click',getGIF);

	
};



	
	

	