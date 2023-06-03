from app.models import db, NoteBook, SCHEMA
from sqlalchemy.sql import text


def seed_notebook():
    taxes = NoteBook(
        title="Taxes", is_default=True, ownerId=1,
    )
    pokemon = NoteBook(
        title="Pokemon", is_default=False, ownerId=1,
    )
    digimon = NoteBook(
        title="Digimon", is_default=False, ownerId=1,
    )
    yu_gi_oh = NoteBook(
        title="Yu_Gi_Oh", is_default=False, ownerId=1,
    )


db.session.add(taxes)
db.session.add(pokemon)
db.session.add(digimon)
db.session.add(yu_gi_oh)
db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notebook():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
