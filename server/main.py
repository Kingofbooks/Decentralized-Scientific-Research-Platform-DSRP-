from fastapi import FastAPI, UploadFile, File, Form, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import shutil
import os
import uvicorn
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Float
from sqlalchemy.orm import sessionmaker, relationship, declarative_base

# FastAPI app
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Setup
DATABASE_URL = "postgresql://username:password@localhost/dsrp_db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Sentence Transformer Model
model = SentenceTransformer("nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

# Models
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    reputation = Column(Float, default=0.0)

    contributions = relationship("Contribution", back_populates="user")

class Contribution(Base):
    __tablename__ = "contributions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    filename = Column(String)
    description = Column(String)
    views = Column(Integer, default=0)
    likes = Column(Integer, default=0)
    citations = Column(Integer, default=0)
    downloads = Column(Integer, default=0)
    
    user = relationship("User", back_populates="contributions")

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency for DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class TextRequest(BaseModel):
    text: str

# Routes
@app.get("/")
def home():
    return {"message": "DSRP API is running"}

@app.post("/embed/")
def get_embedding(request: TextRequest):
    embedding = model.encode(request.text).tolist()
    return {"embedding": embedding}

@app.post("/upload/")
async def upload_file(
    file: UploadFile = File(...), 
    description: str = Form(...), 
    user_id: int = Form(...),
    db: SessionLocal = Depends(get_db)
):
    try:
        file_location = f"uploads/{file.filename}"
        os.makedirs("uploads", exist_ok=True)

        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        user = db.query(User).filter(User.id == user_id).first()
        if user:
            user.reputation += 10  
            db.commit()

        new_contribution = Contribution(user_id=user_id, filename=file.filename, description=description)
        db.add(new_contribution)
        db.commit()

        return {"filename": file.filename, "description": description, "file_location": file_location}
    except Exception as e:
        db.rollback()
        return JSONResponse(status_code=500, content={"message": f"Error uploading file: {str(e)}"})

@app.get("/download/{filename}")
def download_file(filename: str):
    file_location = f"uploads/{filename}"
    if os.path.exists(file_location):
        return FileResponse(file_location, media_type='application/octet-stream', filename=filename)
    return {"error": "File not found"}

@app.post("/update_interactions/")
def update_interactions(contribution_id: int, action: str, db: SessionLocal = Depends(get_db)):
    try:
        contribution = db.query(Contribution).filter(Contribution.id == contribution_id).first()
        if not contribution:
            return JSONResponse(status_code=404, content={"message": "Contribution not found"})

        if action == "view":
            contribution.views += 1
        elif action == "like":
            contribution.likes += 1
        elif action == "download":
            contribution.downloads += 1
        elif action == "citation":
            contribution.citations += 1
        
        db.commit()

        user = db.query(User).filter(User.id == contribution.user_id).first()
        if user:
            user.reputation += 5  
            db.commit()
        
        return {"message": "Interaction updated successfully"}
    except Exception as e:
        db.rollback()
        return JSONResponse(status_code=500, content={"message": f"Error updating interaction: {str(e)}"})

@app.get("/rankings/")
def get_rankings(db: SessionLocal = Depends(get_db)):
    users = db.query(User).order_by(User.reputation.desc()).limit(10).all()
    return [{"name": user.name, "reputation": user.reputation} for user in users]

# Run Server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
