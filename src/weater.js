const fetch = require("node-fetch");

class WeatherAPI {
  constructor() {}

  /* 
	def get_weather():
    url = а'http://api.openweathermap.org/data/2.5/onecall?lat=53.235356&lon=34.354699&appid={weatherToken}&lang=ru&units=metric&exclude=minutely,daily,current'
    request = requests.get(url)
    weather = json.loads(request.text)
    hourly = weather.get('hourly')
    res = ''
    x = 0
    for t in hourly:
        if x > 14:
            break
        time = datetime.fromtimestamp(t['dt']).strftime("%H:00")
        temp = t['temp']
        desc = t['weather'][0]['description']
        wing = t['wind_speed']
        res += f'{time} {temp:.0f}°C 💨{wing}км/ч {desc}\n'
        x += 1
    return res
	*/
}

module.exports = WeatherAPI;
