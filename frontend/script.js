

async function fetchingData(url){
    const response = await fetch(url);
    const result = await response.json();
    console.log(result)
    return result;
}
fetchingData("http://localhost:3000/api/pizza");