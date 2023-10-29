// const baseUrl = "https://api.inaturalist.org/v1/identifications"

// async function getLocations() {
//     const response = await fetch(baseUrl);
//     console.log(response);
//     //converting data into json format
//     const data = await response.json()
//     console.log(data);
//     return data
// }

// getLocations();


// Get references to the HTML elements
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");
const placeIds = []
const placesUrl = "https://api.inaturalist.org/v1/places/autocomplete"
const identificationsUrl = "https://api.inaturalist.org/v1/identifications";


async function searchPlaces() {
  resultsDiv.innerHTML = " ";
  const searchText = searchInput.value;
  const response = await fetch(`https://api.inaturalist.org/v1/places/autocomplete?q=${searchText}`);  // fecthing data from /autocomplete to store the IDs.
  const data = await response.json();
  // console.log(data)
  // console.log(data.results[1])
  for (let i = 0; i < data.results.length; i++) {
    const place = data.results[i].name;
    const placeId = data.results[i].id;
    placeIds.push(placeId);
  }
  // console.log(placeIds)
getPlaceIdentifications(placeIds)
// clear the array, so it doesnt keep adding ids to the array.
placeIds.length = 0;
}

async function getPlaceIdentifications() {
  const urlConcat = placeIds.join(",");
  const url = `${identificationsUrl}?id=${urlConcat}&current=true&order=desc&order_by=created_at`; // fecthing data from identifications/ to search for all ids found on places with the name searched.
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  for (let i = 0; i < data.results.length; i++) {
    const commonName = data.results[i].observation.taxon.preferred_common_name;
    const photo = data.results[i].observation.taxon.default_photo.url;
    const alt = data.results[i].observation.taxon.name;
    resultsDiv.innerHTML += `<div class="images"> <p>${commonName}</p> <br> <img src=${photo} alt=${alt}"<br>`;
  }
}

// searchPlaces();
searchButton.addEventListener("click", searchPlaces);




