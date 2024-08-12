
async function fetchData(city){
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y42383TB7X23CAJJWBPFX6DWE`;
    const progressBar = document.getElementById('progressBar');
    
    // Show the progress bar
    progressBar.style.display = 'block';
    progressBar.value = 0; // Reset progress

    try {
        // Simulate progress
        const simulateProgress = () => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                if (progress <= 100) {
                    progressBar.value = progress;
                } else {
                    clearInterval(interval);
                }
            }, 100); // Update every 100ms
        };

        simulateProgress();
        let response = await fetch(url, { mode: 'cors' });
        clearInterval(simulateProgress);
        progressBar.style.display = 'none';

        if (!response.ok) {
            progressBar.style.display = 'none';
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        //console.log(data); // Return the fetched data
        let processedData = processData(data);
        //displayFetchedData(processedData)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function processData(data){
    console.log(data.days[0].sunset)
    console.log(data.days[0].sunrise)
    
    let tableContent = document.getElementById('fetched')
    tableContent.style.display = 'block';
    let city = document.getElementById('city')
    city.innerHTML = data.resolvedAddress

    let temperature = document.getElementById('temperature')
    temperature.innerHTML = data.days[0].temp

    let humidity = document.getElementById('humidity')
    humidity.innerHTML = data.days[0].humidity

    let feels = document.getElementById('feels')
    feels.innerHTML = data.days[0].feelslike

    let condition = document.getElementById('condition')
    condition.innerHTML = data.days[0].conditions

    let precipitation = document.getElementById('precipitation')
    precipitation.innerHTML = data.days[0].precip

    let days = document.getElementById('date')
    days.innerHTML = data.days[0].datetime

    let sunrise = document.getElementById('sunrise')
    sunrise.innerHTML = data.days[0].icon

    let sunset = document.getElementById('sunset')
    sunset.innerHTML = data.days[0].pressure

   // return (data.days[0].stations)
}

function handleSubmit(event){
    event.preventDefault();
    let location_cont = document.getElementById('location')
    let location = location_cont.value;
    fetchData(location)
    location_cont.value = ''
}

function displayFetchedData(data){
    let dispContainer = document.getElementById('fetched')
    dispContainer.innerHTML = '';
    data.map((item)=>{
        // Create a new list item
        let listItem = document.createElement('li');
        
        // Assuming each item has a 'name' property (adjust as necessary)
        listItem.textContent = item; // Set the text content

        // Append the list item to the container
        dispContainer.appendChild(listItem);
    })
}