function handleSubmit(event){
    event.preventDefault();
    let location = document.getElementById('location').value;
    document.getElementById('fetched').style.display = 'block';
    (async() => {
        const data = await fetchData(location)
        location = ''
        if (data){
            displayFetchedData(data)
        }
    })()
}

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
        return data; // Return the fetched data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function processData(data){
    
   // return (data.days[0].stations)
}


function displayFetchedData(data){
    let tableContent = document.getElementById('fetched')
    
    tableContent.style.display = 'block';
    let city = document.getElementById('city')
    if (city) {
        city.innerHTML = data.resolvedAddress;
    } else {// error handling
        console.error("City element not found");
    }

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

}

