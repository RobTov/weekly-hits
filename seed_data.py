"""
Seed script para poblar la base de datos con artistas y canciones.
Para ejecutar: python seed_data.py
"""

import random
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'weekly_radio_hits.settings')
django.setup()

from django.utils import timezone
from artists.models import Artists
from songs.models import Songs

def seed_database():
    print('Seeding database...')
    
    artists_data = [
        {'name': 'Shakira', 'country': 'Colombia', 'genre': 'Pop'},
        {'name': 'Bad Bunny', 'country': 'Puerto Rico', 'genre': 'Reggaeton'},
        {'name': 'Juan Luis Guerra', 'country': 'República Dominicana', 'genre': 'Bachata'},
        {'name': 'Karol G', 'country': 'Colombia', 'genre': 'Reggaeton'},
        {'name': 'J Balvin', 'country': 'Colombia', 'genre': 'Reggaeton'},
        {'name': 'Rauw Alejandro', 'country': 'Puerto Rico', 'genre': 'Reggaeton'},
        {'name': 'Ozuna', 'country': 'Puerto Rico', 'genre': 'Reggaeton'},
        {'name': 'Feid', 'country': 'Colombia', 'genre': 'Reggaeton'},
        {'name': 'Blessd', 'country': 'Colombia', 'genre': 'Reggaeton'},
        {'name': 'Metro Boomin', 'country': 'Estados Unidos', 'genre': 'Trap'},
    ]
    
    artists = []
    for artist_data in artists_data:
        artist, created = Artists.objects.get_or_create(
            name=artist_data['name'],
            defaults={
                'country': artist_data['country'],
                'genre': artist_data['genre']
            }
        )
        artists.append(artist)
        print(f'  Artista: {artist.name} (created: {created})')
    
    songs_data = [
        {'title': 'Copa de la Vida', 'album': 'Primera Vista', 'genre': 'Pop', 'score': 95},
        {'title': 'Despacito', 'album': 'Primera Vista', 'genre': 'Reggaeton', 'score': 98},
        {'title': 'La Bicicleta', 'album': 'Colmado de Amores', 'genre': 'Bachata', 'score': 88},
        {'title': 'Ojos así', 'album': 'Primera Vista', 'genre': 'Pop', 'score': 92},
        {'title': 'Moscow Mule', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 85},
        {'title': 'Provenza', 'album': 'Mañana Será Bonito', 'genre': 'Reggaeton', 'score': 90},
        {'title': 'Mi Gente', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 87},
        {'title': 'Dakiti', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 89},
        {'title': 'Tusa', 'album': 'Mañana Será Bonito', 'genre': 'Reggaeton', 'score': 91},
        {'title': 'In My Mind', 'album': 'Ritmo Total', 'genre': 'Reggaeton', 'score': 84},
        {'title': 'Amor Genuino', 'album': 'Colmado de Amores', 'genre': 'Bachata', 'score': 86},
        {'title': 'Felices los 4', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 88},
        {'title': 'Traicionera', 'album': 'Trap Ke', 'genre': 'Reggaeton', 'score': 82},
        {'title': 'Quédate', 'album': 'Sueños de Papel', 'genre': 'Pop', 'score': 80},
        {'title': 'Loco', 'album': 'Corazón Latino', 'genre': 'Salsa', 'score': 83},
        {'title': 'Vivir Mi Vida', 'album': 'Colmado de Amores', 'genre': 'Bachata', 'score': 85},
        {'title': 'Bailando', 'album': 'Corazón Latino', 'genre': 'Pop', 'score': 87},
        {'title': 'El Chico del Apartmento 512', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 81},
        {'title': 'China', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 86},
        {'title': 'Verguenza', 'album': 'Fijeo', 'genre': 'Reggaeton', 'score': 79},
        {'title': 'Perreo Intenso', 'album': 'Trap Ke', 'genre': 'Reggaeton', 'score': 78},
        {'title': 'Malvada', 'album': 'Mañana Será Bonito', 'genre': 'Reggaeton', 'score': 84},
        {'title': 'La jumpa', 'album': 'Fijeo', 'genre': 'Reggaeton', 'score': 88},
        {'title': 'Chale', 'album': 'Trap Ke', 'genre': 'Reggaeton', 'score': 76},
        {'title': 'Hey Mor', 'album': 'Fijeo', 'genre': 'Reggaeton', 'score': 82},
        {'title': 'Xiquet', 'album': 'Fijeo', 'genre': 'Reggaeton', 'score': 80},
        {'title': 'Efecto', 'album': 'Mañana Será Bonito', 'genre': 'Reggaeton', 'score': 85},
        {'title': 'Luna', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 83},
        {'title': 'La Oreja', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 81},
        {'title': 'AMG', 'album': 'Trap Ke', 'genre': 'Reggaeton', 'score': 87},
        {'title': 'Punto 40', 'album': 'Fijeo', 'genre': 'Reggaeton', 'score': 89},
        {'title': 'MIA', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 84},
        {'title': 'Yonaguni', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 83},
        {'title': 'Me Porto Bonito', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 90},
        {'title': 'Neverita', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 86},
        {'title': 'Party', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 82},
        {'title': 'Ojitos Lindos', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 88},
        {'title': 'Efecto', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 84},
        {'title': 'Tremendo Split', 'album': 'Trap Ke', 'genre': 'Reggaeton', 'score': 77},
        {'title': 'Rara Vez', 'album': 'Mañana Será Bonito', 'genre': 'Reggaeton', 'score': 83},
        {'title': 'Cairo', 'album': 'Versace en el Sol', 'genre': 'Reggaeton', 'score': 79},
        {'title': 'Máquina de Efectos', 'album': 'Fijeo', 'genre': 'Reggaeton', 'score': 81},
        {'title': 'Safaera', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 85},
        {'title': 'Un Verano Sin Ti', 'album': 'Un Verano Sin Ti', 'genre': 'Reggaeton', 'score': 92},
        {'title': 'Bonita', 'album': 'Colmado de Amores', 'genre': 'Bachata', 'score': 84},
        {'title': 'Burbujas', 'album': 'Sueños de Papel', 'genre': 'Pop', 'score': 78},
        {'title': 'Flor de Plástico', 'album': 'Trap Ke', 'genre': 'Reggaeton', 'score': 75},
        {'title': 'Le Hace Falta', 'album': 'Colmado de Amores', 'genre': 'Bachata', 'score': 82},
    ]
    
    songs_created = 0
    for i, song_data in enumerate(songs_data):
        artist = random.choice(artists)
        genre = song_data['genre']
        
        days_ago = random.randint(0, 365)
        release_date = timezone.now() - timezone.timedelta(days=days_ago)
        
        song, created = Songs.objects.get_or_create(
            title=song_data['title'],
            artist=artist,
            defaults={
                'album': song_data['album'],
                'genre': genre,
                'release_date': release_date,
                'score': song_data['score']
            }
        )
        if created:
            songs_created += 1
    
    print(f'Seed complete!')
    print(f'  Artistas: {len(artists)} total')
    print(f'  Canciones: {songs_created} creadas')


if __name__ == '__main__':
    seed_database()
