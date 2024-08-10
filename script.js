
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
        displayFetchedData(processedData)
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function processData(data){
    console.log(data.days[0].stations)
    return (data.days[0].stations)
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