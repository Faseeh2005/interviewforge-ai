from app.database.database import SessionLocal


#for api routes
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()