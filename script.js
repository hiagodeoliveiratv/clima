document.querySelector(".busca").addEventListener("submit", async (event)=>{
    event.preventDefault();

    let city = document.querySelector('#searchInput').value;

    if(city){
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=b52e9585188cf9293b6f3943ac4f00c5&units=metric&lang=pt_br`;
        
        let res = await fetch(url);
        let json = await res.json();

        if(json.cod == 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        } else {
            clearInfo();
            showWarning("Cidade não encontrada.");
        }
    
    } else {
        clearInfo();
    }
});
function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = "none";
}

function showInfo(json){
    clearInfo();

    document.querySelector('.resultado').style.display = 'block';
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}