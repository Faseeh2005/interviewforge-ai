from fastapi import APIRouter

router = APIRouter(
    prefix="/interview",
    tags=["Interview"]
)

@router.post("/generate")
def generate():
    return {
        "message": "Coming next"
    }