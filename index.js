document.addEventListener("DOMContentLoaded", () => {
 const API_URL = "https://restcountries.com/v3.1/all"
 const countriesContainer = document.getElementById("countriesContainer")
 const searchInput = document.getElementById("searchInput")
 const regionSelect = document.getElementById("regionSelect")

 let countriesData = []

 const fetchCountries = async () => {
  try {
   const response = await fetch(API_URL)
   countriesData = await response.json()
   displayCountries(countriesData)
  } catch (error) {
   console.error("Error fetching countries:", error)
  }
 }
 const darkModeToggle = document.getElementById("darkModeToggle")

 darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")

  if (document.body.classList.contains("dark-mode")) {
   darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
   darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }
 })

 const displayCountries = (countries) => {
  countriesContainer.innerHTML = countries
   .map(
    (country) => `
<div class="col-lg-3 col-md-6 col-sm-12">
                 <div class="card">
                    <img class="card-img-top img-thumbnail" src="${country.flags.png}" alt="${country.name.common} flag">
                    <div class="card-body">
                        <h5 class="card-title">${country.name.common}</h5>
                        <a href="country-detail.html?country=${country.cca3}" class="btn btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `)
    //// when the user clicks the link, they will be directed to the country-detail.html page, and a query parameter will be added to the URL//?country=${country.cca3} means the country code (like USA, CAN, etc.) is appended to the URL. This allows you to fetch or display specific country data on the detail page based on the country code//countries.map(...) creates an array of HTML strings for each country.
    // .join --concatenates all those strings into one single HTML string that represents all the country cards.
   
   .join("")
 }

 searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase()
  const filteredCountries = countriesData.filter((country) => country.name.common.toLowerCase().includes(searchValue))
  displayCountries(filteredCountries)
 })

 regionSelect.addEventListener("change", () => {
  const selectedRegion = regionSelect.value
  const filteredCountries = selectedRegion ? countriesData.filter((country) => country.region === selectedRegion) : countriesData
  displayCountries(filteredCountries)
 })
 fetchCountries()
})
