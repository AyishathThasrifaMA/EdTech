from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine, get_db
import models, schemas

app = FastAPI()

# Enable CORS (allow frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace "*" with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables automatically
Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Backend running successfully"}

# ✅ Signup API
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user_id": new_user.id}

# ✅ Login API
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful", "user_id": db_user.id, "role": db_user.role}

# ✅ Create Assignment (for Teacher)
@app.post("/create-assignment")
def create_assignment(assign: schemas.AssignmentCreate, db: Session = Depends(get_db)):
    new_assignment = models.Assignment(**assign.dict())
    db.add(new_assignment)
    db.commit()
    db.refresh(new_assignment)
    return {"message": "Assignment created successfully", "assignment_id": new_assignment.id}

# ✅ Submit Assignment (for Student)
@app.post("/submit-assignment")
def submit_assignment(submission: schemas.SubmissionCreate, db: Session = Depends(get_db)):
    new_submission = models.Submission(**submission.dict())
    db.add(new_submission)
    db.commit()
    db.refresh(new_submission)
    return {"message": "Assignment submitted successfully", "submission_id": new_submission.id}

# ✅ View Submissions for a given Assignment (for Teacher)
@app.get("/view-submissions/{assignment_id}")
def view_submissions(assignment_id: int, db: Session = Depends(get_db)):
    submissions = db.query(models.Submission).filter(models.Submission.assignment_id == assignment_id).all()
    return submissions

# ✅ Get All Assignments (for Student)
@app.get("/assignments")
def get_assignments(db: Session = Depends(get_db)):
    return db.query(models.Assignment).all()
