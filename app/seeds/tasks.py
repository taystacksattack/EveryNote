from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo user, you can add other users here if you want


def seed_tasks():
    tax_1 = Task(
        title='Adult Responsibility', ownerId=1, description="ask for an extension for the 2023 tax season as you procrastinated to hard", completed=True, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M"))

    pokemon_1 = Task(
        title='Train ', ownerId=1, description="Train and level up your Pokemon to strengthen their stats and evolve them into more powerful forms", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M"))

    digimon_1 = Task(
        title="Hatch ", ownerId=1, description="Hatch and raise a Digimon from a Digitama, taking care of its needs and training it to increase its abilities.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    yu_gi_oh_1 = Task(
        title="Stay updated", ownerId=1, description="Stay updated with the latest card releases and rule changes to adapt your deck and stay competitive.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    danger_1 = Task(
        title="vigilant", ownerId=2, description="Stay vigilant and proactive in monitoring and addressing any potential dangers that may arise.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    war_1 = Task(
        title="Promote ", ownerId=3, description="Promote and participate in peaceful dialogue, conflict resolution, and diplomacy to prevent and mitigate wars.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    lies_1 = Task(
        title="Practice ", ownerId=4, description="Practice active listening and critical thinking to identify and challenge false information or deceptive claims.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    law_1 = Task(
        title="Volunteer", ownerId=5, description="Volunteer or intern at a law firm or legal organization to gain practical experience.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    movies_1 = Task(
        title="Explore ", ownerId=6, description="Explore the history of cinema by watching classic films and studying the evolution of film techniques and storytelling.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    poetry_1 = Task(
        title="Write ", ownerId=7, description="Write a poem every day, exploring different forms and experimenting with various themes and styles.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    musical_1 = Task(
        title="Audition ", ownerId=8, description="Audition for a local theater production or join a community musical group.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    cars_1 = Task(
        title="car repair", ownerId=9, description="Learn basic car repair skills, such as changing a flat tire or replacing a car battery.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    animals_1 = Task(
        title="Advocate ", ownerId=10, description="Advocate for animal welfare by supporting initiatives and organizations that promote responsible pet ownership and conservation efforts.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    cats_1 = Task(
        title="Train ", ownerId=10, description="Train your cat using positive reinforcement techniques to respond to commands and develop good behaviors.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    dogs_1 = Task(
        title="Train ", ownerId=10, description="Train your dog basic obedience commands, such as sit, stay, and come.", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    hippos_1 = Task(
        title="STAY AWAY", ownerId=10, description="DONT GET NEAR HIPPOS AND MAKE SURE YOU ARE NOT IN THEY'RE NATURAL ENVIRONMENT", completed=False, due_date=datetime.strptime("15/11/25 16:30", "%d/%m/%y %H:%M")
    )

    db.session.add(tax_1)
    db.session.add(pokemon_1)
    db.session.add(digimon_1)
    db.session.add(yu_gi_oh_1)
    db.session.add(danger_1)
    db.session.add(war_1)
    db.session.add(lies_1)
    db.session.add(law_1)
    db.session.add(movies_1)
    db.session.add(poetry_1)
    db.session.add(musical_1)
    db.session.add(cars_1)
    db.session.add(animals_1)
    db.session.add(cats_1)
    db.session.add(dogs_1)
    db.session.add(hippos_1)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tasks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
