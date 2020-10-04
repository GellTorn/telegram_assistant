import telebot
import json
import requests
import math
from datetime import datetime

TOKEN = '1282831437:AAHf0gt__4iWrAznK6fUpZWpx2qEBUTYPTI'
bot = telebot.TeleBot(TOKEN)
ids = [394172707] #, 851548030,  430646417, 231315799]

def get_usd_to_rub():
    url = 'https://api.exchangeratesapi.io/latest?base=USD'
    request = requests.get(url)
    usd_to_rub = json.loads(request.text).get('rates').get('RUB')
    return usd_to_rub

def get_eur_to_rub():
    url = 'https://api.exchangeratesapi.io/latest?base=EUR'
    request = requests.get(url)
    eur_to_rub = json.loads(request.text).get('rates').get('RUB')
    return eur_to_rub

def get_weather():
    url = 'http://api.openweathermap.org/data/2.5/onecall?lat=53.235356&lon=34.354699&appid=a294e0969a309d0adb60b3d2d55916af&lang=ru&units=metric&exclude=minutely,daily,current'
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

keyboard1 = telebot.types.ReplyKeyboardMarkup(True, True)
btn1 = telebot.types.KeyboardButton('Текущая погода')
btn2 = telebot.types.KeyboardButton('Прогноз погоды на 6 часов')
btn3 = telebot.types.KeyboardButton('test')
btn4 = telebot.types.KeyboardButton('test')
btn5 = telebot.types.KeyboardButton('test')
keyboard1.row(btn1, btn2)
keyboard1.row(btn3, btn4, btn5)

@bot.message_handler(commands=['start'])
def start_message(message):
    greet = f'Привет, {message.from_user.first_name} {message.from_user.last_name}, вот мои команды'
    bot.send_message(message.chat.id, greet, reply_markup=keyboard1)


# @bot.message_handler(commands=['ruble_rate'])
# def ruble_rate_message(message):
#     rate = f'1$ = {get_usd_to_rub():.2f}₽\n1€ = {get_eur_to_rub():.2f}₽'
#     bot.send_message(message.chat.id, rate, reply_markup=keyboard)
#     print('Отправил валюты ' + message.from_user.username)

# @bot.message_handler(commands=['pi'])
# def pi_message(message):
#     bot.send_message(message.chat.id, math.pi, reply_markup=keyboard)
#     print('Отправил pi ' + message.from_user.username)

# message = 'Утренний STONKS:\n'
# message += f'1 $ = {get_usd_to_rub():.2f} ₽\n1 € = {get_eur_to_rub():.2f} ₽\n'
# message += f'☀ Погода в Брянске на {datetime.now().strftime("%d.%m")}:\n'
# message += get_weather()

# for id in ids:
#     bot.send_message(id, message, reply_markup=keyboard1)

print('Бот стартовал!')
bot.polling(none_stop=True, timeout=20)
