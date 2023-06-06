from app.models import SCHEMA, environment
from app.models.db import db
from app.models.note_tags import note_tag
from app.models.notes import Note
#from notes import taxes_1,
from app.models.tags import Tag

from sqlalchemy.sql import text


def seed_notetags():
    # responsibility = Tag(
    #     name='Adult Responsibility')
    # hobbies = Tag(
    #     name='Hobbies')
    # animals = Tag(
    #     name="Animal info"
#Note.query.filter(Note.ownerId == current_user.id).all()
    # seed_note_1 = Note.query.filter(Note.title =="2023 Tax Season").first()
    seed_note_1 = Note.query.filter(Note.title =="2021 Tax Season").first()
    seed_tag_1 = Tag.query.filter(Tag.name =="Adult Responsibility").first()

    seed_note_2 = Note.query.get(2) #2022 Tax Season
    seed_tag_2 = Tag.query.get(1) #Adult responsibility

    seed_note_3 = Note.query.get(3) #2023 Tax Season
    seed_tag_3 = Tag.query.get(1) #Adult responsibility

    seed_note_4 = Note.query.filter(Note.title == 'Pokemon Types').first()
    seed_tag_4 = Tag.query.filter(Tag.name == "Hobbies").first()

    seed_note_5 = Note.query.get(5) #What inspired the creation of the first Pokemon game..
    seed_tag_5 = Tag.query.get(2) #hobbies

    seed_note_6 = Note.query.get(6) #How has the Pokemon community impacted..
    seed_tag_6 = Tag.query.get(2) #hobbies

    seed_note_7 = Note.query.get(7) #Is Yu_Gi_Oh Dying??..
    seed_tag_7 = Tag.query.get(3) #Yu-Gi-Oh

    seed_note_8 = Note.query.get(8) #BBRRRRRRRRRRRR..
    seed_tag_8 = Tag.query.get(3) #Yu-Gi-Oh

    seed_note_9 = Note.query.get(9) #Analyze the role of the Egyptian God..
    seed_tag_9 = Tag.query.get(3) #Yu-Gi-Oh

    print("\n\n\n\nwow we here", seed_note_1)

    seed_note_1.tags.append(seed_tag_1)
    db.session.add(seed_note_1)
    db.session.commit()
    seed_note_2.tags.append(seed_tag_2)
    db.session.add(seed_note_2)
    db.session.commit()
    seed_note_3.tags.append(seed_tag_3)
    db.session.add(seed_note_3)
    db.session.commit()
    seed_note_4.tags.append(seed_tag_4)
    db.session.add(seed_note_4)
    db.session.commit()
    seed_note_5.tags.append(seed_tag_5)
    db.session.add(seed_note_5)
    db.session.commit()
    seed_note_6.tags.append(seed_tag_6)
    db.session.add(seed_note_6)
    db.session.commit()
    seed_note_7.tags.append(seed_tag_7)
    db.session.add(seed_note_7)
    db.session.commit()
    seed_note_8.tags.append(seed_tag_8)
    db.session.add(seed_note_8)
    db.session.commit()
    seed_note_9.tags.append(seed_tag_9)
    db.session.add(seed_note_9)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_notetags():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.note_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM note_tags"))

    db.session.commit()
