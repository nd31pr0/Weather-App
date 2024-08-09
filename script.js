
async function fetchData(location){
    let city = location
    let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=Y42383TB7X23CAJJWBPFX6DWE`;
    try {
        let response = await fetch(url, { mode: 'cors' });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let data = await response.json();
        console.log(data); // Return the fetched data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
fetchData('london');

