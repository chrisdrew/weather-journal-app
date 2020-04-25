/* Global Variables */
const API_KEY = 'd533c2e65aa65793bdef4d6bf3eb62f4';
const BASE_URL = 'api.openweathermap.org/data/2.5/weather?q=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let zip;

let newEntry = {
    temp: '',
    date: '',
    feelings: ''
}

let updatedEntry = [];
let alert = document.getElementById('alert');
///////
/*
    const postData = async ( url = '', data = {})=>{
        const response = await fetch(url, {
            method: 'POST', 
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify(data), 
        });
        console.log(response);

        try {
            const newData = await response.json();
            return newData;
        }catch(error) {
            console.log('error ', error);
        }
    }
*/
// postData('/postWeather', {zip: 't2v 3w4', feelings: 'sad'});




// 
/*
    const getWeatherDemo = async () => {
        const res = await fetch('/getWeather');
        console.log(res);
        try{
            const data = await res.json();
            console.log(data);
        } catch (e){
            console.log("error " + e);
        }
    }
    function getWeatherApp (city){
        fetch('https://api.openweathermap.org/data/2.5/weather?q=Calgary&appid=' + API_KEY)
        .then(function(resp) { return resp.json() }) // Convert data to json
        .then(function(data) {
        console.log(data);
        })
        .catch(function() {
        // catch any errors
        });
    }
*/
// 



// GET local info
const getLocalInfo = async()=>{
    const res = await fetch('/getWeather');

    try{
        const data = await res.json();
        return data
    } catch (e){
        console.log("error " + e);
    }
}


// GET Weather with Zip Code
/*
    const getCityWeather = async (zipCode) =>{

        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',US&appid=' + API_KEY);

        try{
            const data = await res.json();
            console.log(data);
            if(data.cod === '400' || data.cod === 400){
                document.getElementById('alertText').innerHTML = 'Sorry ' + data.message; 
            }else{
                newEntry.temp = data.main.temp;
                newEntry.date = newDate;
                newEntry.feelings = document.getElementById('feelings').value;
                return newEntry
            }
        } catch (e){
            // console.log("error ");
            // console.log(e);
            document.getElementById('alertText').innerHTML = 'Sorry ' + data.message;
            return
        }
    }
*/
const getCityWeather = async (zipCode) =>{

    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+',US&appid=' + API_KEY);

    try{
        const data = await res.json();
        console.log(data);
        if(data.cod === 400 || data.cod === 404){
            console.log('data');
            console.log(data);
            document.getElementById('alertText').innerHTML = 'Sorry ' + data.message; 
            return
        }else{
            newEntry.temp = data.main.temp;
            newEntry.date = newDate;
            newEntry.feelings = document.getElementById('feelings').value;
            return newEntry
        }
    } catch (e){
        console.log("error ");
        console.log(e);
        document.getElementById('alertText').innerHTML = 'Sorry ';
        return
    }
}

// POST data that was input
const postCityWeather = async(url='', data)=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
    });
    try {
        const newData = await response.json();
        return newData;
    }catch(error) {
        console.log('error ', error);
    }
}

// GET the new data
const getNewData = async () =>{
    const res = await fetch('/getWeather');

    try{
        const data = await res.json();
        updatedEntry = data;
        return updatedEntry
    } catch (e){
        console.log("error " + e);
    }
}

const updateForm = async() =>{
    let lastCurrentLog = updatedEntry.length - 1;
    document.getElementById('date').innerHTML    = updatedEntry[lastCurrentLog].date;
    document.getElementById('temp').innerHTML    = updatedEntry[lastCurrentLog].temp;
    document.getElementById('content').innerHTML = updatedEntry[lastCurrentLog].feelings;
}


const asyncFunction = async () => {
    await getLocalInfo();
    await getCityWeather(zip);
    await postCityWeather('/postWeather', newEntry);
    await getNewData();
    await updateForm();
  }


document.getElementById('generate').addEventListener('click', function(){
    zip = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;
    console.log('feelings');
    console.log(feelings);
    
    if(zip && feelings){
        asyncFunction();
    }
    else{
        document.getElementById('alertText').innerHTML = 'Sorry you need to fill out the Zipcode and feelings';
        return
    }
    
});