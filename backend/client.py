
import psutil
import json
import websockets
import asyncio
import uuid

SERVER_URL = "ws://192.168.1.10:8000/ws/SantaCruz"  # URL del servidor FastAPI WebSocket

async def send_disk_info():
    async with websockets.connect(SERVER_URL) as websocket:
        while True:
            disk = psutil.disk_usage('/')
            total_space = disk.total
            free_space = disk.free
            used_space = disk.used
            disk_info = {"total_space": total_space, "free_space": free_space, "used_space": used_space}
            await websocket.send(json.dumps(disk_info))
            await asyncio.sleep(60)  # Espera 60 segundos antes de enviar la siguiente actualización

if __name__ == "__main__":
    asyncio.run(send_disk_info())
