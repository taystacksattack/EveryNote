from app.models import db, Note, SCHEMA, environment
from sqlalchemy.sql import text


def seed_notes():
    taxes_for_2023 = Note(
        title=" 2023 Tax Season", body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut ", ownerId=1, notebookId=1, tagId=1
    )
    pokemon_types = Note(
        title="Pokemon Types", body="labore et dolore magna aliqua. Egestas pretium aenean pharetra magna ac.", ownerId=1, notebookId=2, tagId=2
    )
    what_are_digimon = Note(
        title="Digimon Digital Monsters,What are they", body="Amet dictum sit amet justo donec. Viverra vitae congue eu", ownerId=1, notebookId=3, tagId=2
    )
    yu_gi_oh_is_dying = Note(
        title="Is Yu_Gi_Oh Dying??", body="consequat ac felis donec. Lectus sit amet est placerat in egestas erat imperdiet.", ownerId=2, notebookId=4, tagId=2
    )

    db.session.add(taxes_for_2023)
    db.session.add(pokemon_types)
    db.session.add(what_are_digimon)
    db.session.add(yu_gi_oh_is_dying)
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
            f"TRUNCATE table {SCHEMA}.note RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
