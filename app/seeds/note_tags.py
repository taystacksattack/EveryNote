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
    seed_note_2 = Note.query.get(2) #2022 Tax Season
    seed_note_3 = Note.query.get(3) #2023 Tax Season

    seed_note_test = Note.query.get(0)
    seed_tag_test = Tag.query.get(0)
    seed_note_test.tags.append(seed_tag_test)
    db.session.add(seed_note_test)




    seed_tag_1_2_3 = Tag.query.filter(Tag.name =="Adult Responsibility").first()
    # seed_tag_2 = Tag.query.get(1) #Adult responsibility

    seed_note_4 = Note.query.filter(Note.title == 'Pokemon Types').first()
    seed_note_5 = Note.query.get(5) #What inspired the creation of the first Pokemon game..
    seed_note_6 = Note.query.get(6) #How has the Pokemon community impacted..

    seed_tag_4_5_6 = Tag.query.filter(Tag.name == "Hobbies").first()
    # seed_tag_5 = Tag.query.get(2) #hobbies
    # seed_tag_6 = Tag.query.get(2) #hobbies

    seed_note_7 = Note.query.get(10) #Is Yu_Gi_Oh Dying??..
    seed_note_8 = Note.query.get(11) #BBRRRRRRRRRRRR..
    seed_note_9 = Note.query.get(12) #Analyze the role of the Egyptian God..

    seed_tag_7_8_9 = Tag.query.get(5) #Yu-Gi-Oh
    # seed_tag_8 = Tag.query.get(5) #Yu-Gi-Oh
    # seed_tag_9 = Tag.query.get(5) #Yu-Gi-Oh


    seed_note_10 = Note.query.filter(Note.title.like("%Thrill and Peril%")).first()
    seed_tag_10_1 = Tag.query.get(1)
    seed_tag_10_2 = Tag.query.get(2)
    seed_tag_10_3 = Tag.query.get(3)

    seed_note_11 = Note.query.get(7)
    seed_note_12 = Note.query.get(8)
    seed_note_13 = Note.query.get(9)
    seed_tag_11_12_13 = Tag.query.get(4) #DIGIMON


    #print("\n\n\n\nwow we here", seed_note_1)

    seed_note_1.tags.append(seed_tag_1_2_3)
    db.session.add(seed_note_1)

    seed_note_2.tags.append(seed_tag_1_2_3)
    db.session.add(seed_note_2)

    seed_note_3.tags.append(seed_tag_1_2_3)
    db.session.add(seed_note_3)

    seed_note_4.tags.append(seed_tag_4_5_6)
    db.session.add(seed_note_4)

    seed_note_5.tags.append(seed_tag_4_5_6)
    db.session.add(seed_note_5)

    seed_note_6.tags.append(seed_tag_4_5_6)
    db.session.add(seed_note_6)

    seed_note_7.tags.append(seed_tag_7_8_9)
    db.session.add(seed_note_7)

    seed_note_8.tags.append(seed_tag_7_8_9)
    db.session.add(seed_note_8)

    seed_note_9.tags.append(seed_tag_7_8_9)
    db.session.add(seed_note_9)

    #One note, many tags
    seed_note_10.tags.append(seed_tag_10_1)
    seed_note_10.tags.append(seed_tag_10_2)
    seed_note_10.tags.append(seed_tag_10_3)
    db.session.add(seed_note_10)

    seed_note_11.tags.append(seed_tag_11_12_13)
    db.session.add(seed_note_11)

    seed_note_12.tags.append(seed_tag_11_12_13)
    db.session.add(seed_note_12)

    seed_note_13.tags.append(seed_tag_11_12_13)
    db.session.add(seed_note_13)

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
