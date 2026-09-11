from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import market
from app.api.routes import rates
from app.api.routes import history
from app.api.routes import compare
from app.api.routes import banks
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
app.include_router(banks.router)
app.include_router(compare.router)
app.include_router(rates.router)
app.include_router(history.router)
app.include_router(market.router)


@app.get("/health")
def health():
    return {
        "status": "ok",
    }
