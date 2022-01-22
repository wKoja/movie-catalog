import os
import random
import sqlite3
from datetime import datetime
from faker import Faker

fake = Faker()

path = 'alinea-test.db'
if os.path.exists(path):
    os.remove(path)


def random_string(N, alphabet='abcdefghijklmnopqrstuvwxyz'):
    return ''.join([random.choice(alphabet) for i in range(N)])


arr_nest = []

film_names = ['Whispers In The Fires', 'Call To The River', 'That Which Lies In The Oceans', 'Tales Of The Mist', 'At The Mountains Of Madness',
              'Massacre Under The Waning Moon', 'Sins Of The Fathers', 'Revelations', 'I Ran Out Of Ideas']

genres = ['Horror', 'Comedy', 'Drama',
          'Action', 'Noir', 'Westerns', 'Musicals']

i = 1
while i != 50:
    arr = [{"id": i,
            "nome_filme": random.choice(film_names),
            "diretor": fake.name(),
            "genero": random.choice(genres),
            "em_cartaz": random.choice([0, 1]),
            "data_lancamento": str(fake.date_between(start_date='-30y', end_date='now')),
            "imagem_url": random_string(12)
            }]
    arr_nest.append(arr)
    i = i + 1

conn = sqlite3.connect(path)
c = conn.cursor()

c.execute('''CREATE TABLE FILMES
       ([id] integer primary key autoincrement not null, [nome_filme] text, [diretor] text,
       [genero] text, [em_cartaz] integer, [data_lancamento] text, [imagem_url] text)
       ''')

i = 0
while i != len(arr_nest):
    pid = arr_nest[i][0]["id"]
    nome_filme = arr_nest[i][0]["nome_filme"]
    diretor = arr_nest[i][0]["diretor"]
    genero = arr_nest[i][0]["genero"]
    em_cartaz = arr_nest[i][0]["em_cartaz"]
    data_lancamento = arr_nest[i][0]["data_lancamento"]
    imagem_url = arr_nest[i][0]["imagem_url"]

    c.execute("INSERT INTO FILMES VALUES (?, ?, ?, ?, ?, ?, ?)", [
              pid, nome_filme, diretor, genero, em_cartaz, data_lancamento, imagem_url
              ])
    conn.commit()
    i = i + 1

conn.close()
