from fastapi import FastAPI, WebSocket
from typing import List, Optional
from pydantic import BaseModel
import asyncio
import json
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class DiskInfo(BaseModel):
    total_space: int
    free_space: int
    used_space: int


class ClientInfo(BaseModel):
    client_id: str
    disk_info: Optional[DiskInfo]


clients = {
    "SantaCruz": None,
    "Cochabamba": None,
    "LaPaz": None,
    "Oruro": None,
    "Potosi": None,
    "Tarija": None,
    "Beni": None,
    "Pando": None,
    "Chuquisaca": None,
}


@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            disk_info = DiskInfo(**json.loads(data))
            clients[client_id] = disk_info
            print(f"Disk info received from client {client_id}")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        print(f"Connection closed for client {client_id}")
        clients[client_id] = None
        await websocket.close()


@app.get("/")
async def read_root():
    return {"message": "Server is running"}


@app.get("/get_clients_info")
async def get_clients_info():
    return clients
