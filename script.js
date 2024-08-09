
async function fetchData(city){
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y42383TB7X23CAJJWBPFX6DWE`;
    try {
        let response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        //console.log(data); // Return the fetched data
        processData(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function processData(data){
    console.log(data.days)
}

function handleSubmit(event){
    event.preventDefault();
    let location_cont = document.getElementById('location')
    let location = location_cont.value;
    fetchData(location)
    location_cont.value = ''
}
