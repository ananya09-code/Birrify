import flask
from fastapi import APIRouter, Depends, Query


router = APIRouter(
    prefix="/api/tast",
    tags=["TAST"],
)


@router.get("/")
def get_tast(
    db: flask.Session = Depends(flask.session),
):
    return {
        "hello": "world",
    }
