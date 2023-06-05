from app.models import SCHEMA, environment
from app.models.db import db
from app.models.notebooks import Notebook
from sqlalchemy.sql import text


def seed_notebooks():
    taxes = Notebook(
        title="Taxes", is_default=True, ownerId=1,
    )
    pokemon = Notebook(
        title="Pokemon", is_default=False, ownerId=1,
    )
    digimon = Notebook(
        title="Digimon", is_default=False, ownerId=1,
    )
    yu_gi_oh = Notebook(
        title="Yu_Gi_Oh", is_default=False, ownerId=1,
    )
    danger = Notebook(
        title="danger", is_default=True, ownerId=2,
    )
    war = Notebook(
        title="war", is_default=True, ownerId=3,
    )
    lies = Notebook(
        title="lies", is_default=True, ownerId=4,
    )
    law = Notebook(
        title="law", is_default=True, ownerId=5,
    )
    Movies = Notebook(
        title="Movies", is_default=True, ownerId=6,
    )
    poetry = Notebook(
        title="poetry", is_default=True, ownerId=7,
    )
    Musical = Notebook(
        title="Musical ", is_default=True, ownerId=8,
    )
    cars = Notebook(
        title="cars ", is_default=True, ownerId=9,
    )
    animals = Notebook(
        title="animals ", is_default=True, ownerId=10,
    )
    cats = Notebook(
        title="cats", is_default=False, ownerId=10,
    )
    dogs = Notebook(
        title="dogs", is_default=False, ownerId=10,
    )
    hippos = Notebook(
        title="hippos", is_default=False, ownerId=10,
    )

    db.session.add(taxes)
    db.session.add(pokemon)
    db.session.add(digimon)
    db.session.add(yu_gi_oh)
    db.session.add(danger)
    db.session.add(war)
    db.session.add(lies)
    db.session.add(law)
    db.session.add(Movies)
    db.session.add(poetry)
    db.session.add(Musical)
    db.session.add(cars)
    db.session.add(animals)
    db.session.add(cats)
    db.session.add(dogs)
    db.session.add(hippos)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notebooks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
