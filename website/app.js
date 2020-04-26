/* Global Variables */
const API_KEY  = 'd533c2e65aa65793bdef4d6bf3eb62f4';
const BASE_URL = 'api.openweathermap.org/data/2.5/weather?q=';

const dateElm    = document.getElementById('date');
const cityElm    = document.getElementById('city');
const tempElm    = document.getElementById('temp');
const contentElm = document.getElementById('content');
const alert      = document.getElementById('alert');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

let zip;

let newEntry = {
    temp: '',
    city: '',
    date: '',
    feelings: ''
}

let updatedEntry = [];
///////

// GET local info
const getLocalInfo = async()=>{
    const res = await fetch('/getWeather');

    try{
        const data = await res.json();
        return data
    } catch (e){
        console.log('error ' , e);
    }
}



const getCityWeather = async (zipCode) =>{

    const res = await fetch(BASE_URL+zipCode+',US&appid=' + API_KEY);

    try{
        const data = await res.json();
        const cod = parseInt(data.cod);
        if(cod == 400 || cod == 404){
            alert.classList.remove('d-none');
            alert.childNodes[1].innerHTML = 'Sorry ' + data.message; 
            return
        }else{
            newEntry.temp = data.main.temp;
            newEntry.city = data.name;
            newEntry.date = newDate;
            newEntry.feelings = document.getElementById('feelings').value;
            return newEntry
        }
    } catch (e){
        console.log('error ' , e);
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
        return
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
        console.log('error ' , e);
        return
    }
}

const updateForm = async() =>{
    let lastCurrentLog = updatedEntry.length - 1;
    dateElm.innerHTML    = updatedEntry[lastCurrentLog].date;
    cityElm.innerHTML    = updatedEntry[lastCurrentLog].city;
    tempElm.innerHTML    = updatedEntry[lastCurrentLog].temp;
    contentElm.innerHTML = updatedEntry[lastCurrentLog].feelings;
}


const asyncFunction = async () => {
    await getLocalInfo();
    await getCityWeather(zip);
    await postCityWeather('/postWeather', newEntry);
    await getNewData();
    await updateForm();
  }


document.getElementById('generate').addEventListener('click', function(){
    alert.classList.add('d-none');
    zip = document.getElementById('zip').value;
    feelings = document.getElementById('feelings').value;
    
    if(zip && feelings){
        asyncFunction();
    }
    else{
        alert.classList.remove('d-none');
        alert.childNodes[1].innerHTML = 'Sorry you need to fill out the zipcode and feelings';
        return
    }
    
});