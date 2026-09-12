from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import market
from app.api.routes import rates
from app.api.routes import history
from app.api.routes import compare
from app.api.routes import banks
from app.api.routes import info

from app.api.v1 import rates as public_rates
from app.api.v1 import banks as public_banks
from app.api.v1 import history as public_history


app = FastAPI(
    title="Birrify API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Internal / frontend API
app.include_router(banks.router)
app.include_router(compare.router)
app.include_router(rates.router)
app.include_router(history.router)
app.include_router(market.router)
app.include_router(info.router)


# Public Developer API
app.include_router(public_rates.router)
app.include_router(public_banks.router)
app.include_router(public_history.router)


@app.get("/health")
def health():
    return {
        "status": "ok",
    }
