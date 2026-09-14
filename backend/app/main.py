
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import rates


app = FastAPI(
    title="Birrify API",
    version="1.0.0",
)


# -----------------------------------
# CORS
# -----------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------------
# ROUTES
# -----------------------------------

app.include_router(rates.router)


# -----------------------------------
# HEALTH CHECK
# -----------------------------------

@app.get("/health")
def health_check():
    return {"status": "normal"}
