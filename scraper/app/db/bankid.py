from .database import SessionLocal
from .model import Bank


def get_or_create_bank_id(bank_name):

    db = SessionLocal()

    try:

        # normalize
        bank_name = bank_name.strip().lower()

        # check existing bank
        bank = (
            db.query(Bank)
            .filter(Bank.name == bank_name)
            .first()
        )

        # if exists
        if bank:
            return bank.id

        # create new bank
        new_bank = Bank(name=bank_name)

        db.add(new_bank)
        db.commit()
        db.refresh(new_bank)

        return new_bank.id

    except Exception as e:

        db.rollback()
        print("BANK ERROR:", e)

    finally:

        db.close()