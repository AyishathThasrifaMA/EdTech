from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str  # "student" or "teacher"

class UserLogin(BaseModel):
    email: str
    password: str

class AssignmentCreate(BaseModel):
    title: str
    description: str
    teacher_id: int

class SubmissionCreate(BaseModel):
    assignment_id: int
    student_id: int
    content: str
