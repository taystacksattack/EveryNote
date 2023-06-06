from app.models import db, Note, SCHEMA, environment
from sqlalchemy.sql import text

from app.seeds.data import lorem_ipsum,a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24,a25,a26,a27,a28,a29,a30,a31,a32,a33,a34,a35,a36,a37,a38,a39,a40,a41,a42,a43,a44,a45,a46,a47,a48


def seed_notes():

    taxes_1 = Note(
        title="2021 Tax Season", body=a1, trash=False, ownerId=1, notebookId=1
    )
    taxes_2 = Note(
        title="2022 Tax Season", body=a2, trash=False, ownerId=1, notebookId=1
    )
    taxes_3 = Note(
        title="2023 Tax Season", body=a3, trash=False, ownerId=1, notebookId=1
    )
    pokemon_1 = Note(
        title="Pokemon Types", body=a4, trash=False, ownerId=1, notebookId=2
    )
    pokemon_2 = Note(
        title="What inspired the creation of the first Pokemon game and how has the franchise evolved since then?", body=a5, trash=False, ownerId=1, notebookId=2
    )
    pokemon_3 = Note(
        title="How has the Pokemon community impacted popular culture and influenced other video game franchises?", body=a6, trash=False, ownerId=1, notebookId=2
    )
    digimon_1 = Note(
        title="Digimon Digital Monsters,What are they", body=a7, trash=False, ownerId=1, notebookId=3
    )
    digimon_2 = Note(
        title="concept of Digivolution in Digimon", body=a8, trash=False, ownerId=1, notebookId=3
    )
    digimon_3 = Note(
        title="basic premise of the Digimon franchise", body=a9, trash=False, ownerId=1, notebookId=3
    )
    yu_gi_oh_1 = Note(
        title="Is Yu_Gi_Oh Dying??", body=a10, trash=False, ownerId=1, notebookId=4
    )
    yu_gi_oh_2 = Note(
        title="BRRRRRRRRRRRRRRRRRRRR", body=a11, trash=False, ownerId=1, notebookId=4
    )
    yu_gi_oh_3 = Note(
        title="Analyze the role of the Egyptian God Cards in the Yu-Gi-Oh!", body=a12, trash=False, ownerId=1, notebookId=4
    )
    danger_1 = Note(
        title="Thrill and Peril: Tales of Danger Unleashed", body=a13, trash=False, ownerId=2, notebookId=5
    )
    danger_2 = Note(
        title="Navigating the Abyss: A Brush with Danger", body=a14, trash=False, ownerId=2, notebookId=5
    )
    danger_3 = Note(
        title="When Shadows Loom: Confronting the Danger Within", body=a15, trash=False, ownerId=2, notebookId=5
    )
    war_1 = Note(
        title="Echoes of Valor: Stories from the Battlefield", body=a16, trash=False, ownerId=3, notebookId=6
    )
    war_2 = Note(
        title="The Price of Freedom: Unmasking the Realities of War", body=a17, trash=False, ownerId=3, notebookId=6
    )
    war_3 = Note(
        title="Unforgotten Heroes: Courage Amidst the Chaos of War", body=a18, trash=False, ownerId=3, notebookId=6
    )
    lies_1 = Note(
        title="Web of Deception: Unraveling the Tangled Lies", body=a19, trash=False, ownerId=4, notebookId=7
    )
    lies_2 = Note(
        title="The Art of Illusion: Exploring the World of Lies", body=a20, trash=False, ownerId=4, notebookId=7
    )
    lies_3 = Note(
        title="Smoke and Mirrors: Truth and Lies in a Disguised Reality", body=a21, trash=False, ownerId=4, notebookId=7
    )
    law_1 = Note(
        title="In Pursuit of Justice: Trials, Triumphs, and Legal Tales", body=a22, trash=False, ownerId=5, notebookId=8
    )
    law_2 = Note(
        title="Behind the Gavel: Inside Stories from the Courtroom", body=a23, trash=False, ownerId=5, notebookId=8
    )
    law_3 = Note(
        title="Breaking Barriers: Trailblazing Lawyers and Landmark Cases", body=a24, trash=False, ownerId=5, notebookId=8
    )
    movies_1 = Note(
        title="Celluloid Chronicles: Captivating Stories Behind the Silver Screen", body=a25, trash=False, ownerId=6, notebookId=9
    )
    movies_2 = Note(
        title="The Cinematic Odyssey: Unforgettable Moments in Film History", body=a26, trash=False, ownerId=6, notebookId=9
    )
    movies_3 = Note(
        title="Beyond the Reel: Exploring the Magic of Movie Making", body=a27, trash=False, ownerId=6, notebookId=9
    )
    poetry_1 = Note(
        title="Whispers of the Soul: Poetic Expressions of Love and Loss", body=a28, trash=False, ownerId=7, notebookId=10
    )
    poetry_2 = Note(
        title="Verse Untamed: Diving into the Depths of Emotion", body=a29, trash=False, ownerId=7, notebookId=10
    )
    poetry_3 = Note(
        title="A Symphony of Words: Poetry as a Window to the Human Spirit", body=a30, trash=False, ownerId=7, notebookId=10
    )
    musical_1 = Note(
        title="Song and Dance: Legendary Musicals that Shaped the Stage", body=a31, trash=False, ownerId=8, notebookId=11
    )
    musical_2 = Note(
        title="Harmony in Motion: The Magic of Musicals on Broadway", body=a32, trash=False, ownerId=8, notebookId=11
    )
    musical_3 = Note(
        title="From Broadway to West End: A Journey through Musical Theater", body=a33, trash=False, ownerId=8, notebookId=11
    )
    cars_1 = Note(
        title="The Need for Speed: Legendary Cars and Their Stories", body=a34, trash=False, ownerId=9, notebookId=12
    )
    cars_2 = Note(
        title="Chrome and Steel: Icons of Automotive Design", body=a35, trash=False, ownerId=9, notebookId=12
    )
    cars_3 = Note(
        title="Driving Through Time: Evolution and Innovation in the Automobile Industry", body=a36, trash=False, ownerId=9, notebookId=12
    )
    animals_1 = Note(
        title="Wild Wonders: Extraordinary Encounters in the Animal Kingdom", body=a37, trash=False, ownerId=10, notebookId=13
    )
    animals_2 = Note(
        title="Nature's Diversity: Exploring the Rich Tapestry of Wildlife", body=a38, trash=False, ownerId=10, notebookId=13
    )
    animals_3 = Note(
        title="Guardians of the Earth: Conservation Stories from the Animal Realm", body=a39, trash=False, ownerId=10, notebookId=13
    )
    cats_1 = Note(
        title="Purr-fect Companions: Tales of Feline Charm and Mischief", body=a40, trash=False, ownerId=10, notebookId=14
    )
    cats_2 = Note(
        title="Whiskers and Whimsy: Celebrating the Enigmatic World of Cats", body=a41, trash=False, ownerId=10, notebookId=14
    )
    cats_3 = Note(
        title="Adventures of the Catnip Crusaders: Feline Heroes and Their Feats", body=a42, trash=False, ownerId=10, notebookId=14
    )
    dogs_1 = Note(
        title="Loyalty Unleashed: Inspiring Stories of Canine Devotion", body=a43, trash=False, ownerId=10, notebookId=15
    )
    dogs_2 = Note(
        title="Paws and Promises: Heartwarming Tales of Man's Best Friend", body=a44, ownerId=10, notebookId=15
    )
    dogs_3 = Note(
        title="Tales from the Leash: Adventures in the Wonderful World of Dogs", body=a45, trash=False, ownerId=10, notebookId=15
    )
    hippos_1 = Note(
        title="Behemoths of the Nile: Mysteries and Marvels of the Hippopotamus", body=a46, trash=False, ownerId=10, notebookId=16
    )
    hippos_2 = Note(
        title="River Giants: Exploring the Lives of Hippos in the Wild", body=a47, trash=False, ownerId=10, notebookId=16
    )
    hippos_3 = Note(
        title="Hippos and Beyond: Discovering the Fascinating World of Semi-Aquatic Giants", body=a48, trash=False, ownerId=10, notebookId=16
    )

    seeds = [taxes_1, taxes_2, taxes_3,
             pokemon_1, pokemon_2, pokemon_3,
             digimon_1, digimon_2, digimon_3,
             yu_gi_oh_1, yu_gi_oh_2, yu_gi_oh_3,
             danger_1, danger_2, danger_3,
             war_1, war_2, war_3,
             lies_1, lies_2, lies_3,
             law_1, law_2, law_3,
             movies_1, movies_2, movies_3,
             poetry_1, poetry_2, poetry_3,
             musical_1, musical_2, musical_3,
             cars_1, cars_2, cars_3,
             animals_1, animals_2, animals_3,
             cats_1, cats_2, cats_3,
             dogs_1, dogs_2, dogs_3,
             hippos_1, hippos_2, hippos_3
             ]

    db.session.add(taxes_1)
    db.session.add(taxes_2)
    db.session.add(taxes_3)
    db.session.add(pokemon_1)
    db.session.add(pokemon_2)
    db.session.add(pokemon_3)
    db.session.add(digimon_1)
    db.session.add(digimon_2)
    db.session.add(digimon_3)
    db.session.add(yu_gi_oh_1)
    db.session.add(yu_gi_oh_2)
    db.session.add(yu_gi_oh_3)
    db.session.add(danger_1)
    db.session.add(danger_2)
    db.session.add(danger_3)
    db.session.add(war_1)
    db.session.add(war_2)
    db.session.add(war_3)
    db.session.add(lies_1)
    db.session.add(lies_2)
    db.session.add(lies_3)
    db.session.add(law_1)
    db.session.add(law_2)
    db.session.add(law_3)
    db.session.add(movies_1)
    db.session.add(movies_2)
    db.session.add(movies_3)
    db.session.add(poetry_1)
    db.session.add(poetry_2)
    db.session.add(poetry_3)
    db.session.add(musical_1)
    db.session.add(musical_2)
    db.session.add(musical_3)
    db.session.add(cars_1)
    db.session.add(cars_2)
    db.session.add(cars_3)
    db.session.add(animals_1)
    db.session.add(animals_2)
    db.session.add(animals_3)
    db.session.add(cats_1)
    db.session.add(cats_2)
    db.session.add(cats_3)
    db.session.add(dogs_1)
    db.session.add(dogs_2)
    db.session.add(dogs_3)
    db.session.add(hippos_1)
    db.session.add(hippos_2)
    db.session.add(hippos_3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notes():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
