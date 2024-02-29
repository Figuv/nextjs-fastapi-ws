"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientCard from "./ClientCard";

const ClientInfoTable: React.FC = () => {
  const [clientsInfo, setClientsInfo] = useState({});
  const [totalTotalSpace, setTotalTotalSpace] = useState(0);
  const [totalFreeSpace, setTotalFreeSpace] = useState(0);
  const [totalUsedSpace, setTotalUsedSpace] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.10:8000/get_clients_info"
        );
        setClientsInfo(response.data);
      } catch (error) {
        console.error("Error fetching clients info:", error);
      }
    };

    fetchData(); // Llama a fetchData inmediatamente al cargar el componente

    const intervalId = setInterval(fetchData, 5000); // Llama a fetchData cada 5 segundos

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let totalTotalSpaceSum = 0;
    let totalFreeSpaceSum = 0;
    let totalUsedSpaceSum = 0;

    Object.values(clientsInfo).forEach((clientInfo: any) => {
      if (
        clientInfo &&
        clientInfo.total_space &&
        clientInfo.free_space &&
        clientInfo.used_space
      ) {
        totalTotalSpaceSum += clientInfo.total_space;
        totalFreeSpaceSum += clientInfo.free_space;
        totalUsedSpaceSum += clientInfo.used_space;
      }
    });

    totalTotalSpaceSum = totalTotalSpaceSum / (1024 * 1024 * 1024);
    totalFreeSpaceSum = totalFreeSpaceSum / (1024 * 1024 * 1024);
    totalUsedSpaceSum = totalUsedSpaceSum / (1024 * 1024 * 1024);

    setTotalTotalSpace(totalTotalSpaceSum);
    setTotalFreeSpace(totalFreeSpaceSum);
    setTotalUsedSpace(totalUsedSpaceSum);
  }, [clientsInfo]);

  const clientIds = Object.keys(clientsInfo);

  return (
    <div>
      <p className="font-bold text-2xl">Monitor Nacional de Almacenamiento</p>
      <div className="flex items-stretch justify-between">
        <div className="text-xs font-medium">
          <p className="text-black">
            Espacio total de todos los clientes: {totalTotalSpace.toFixed(2)} GB
          </p>
          <p className="text-black">
            Espacio libre de todos los clientes: {totalFreeSpace.toFixed(2)} GB
          </p>
          <p className="text-black">
            Espacio usado de todos los clientes: {totalUsedSpace.toFixed(2)} GB
          </p>
        </div>
        <div className="text-xs font-medium">
          <p className="text-black">
            Última actualización: {new Date().toLocaleString()}
          </p>

          <p className="text-black">
            Clientes reportados:{" "}
            {
              Object.values(clientsInfo).filter(
                (clientInfo) => clientInfo !== null
              ).length
            }{" "}
            / {clientIds.length}
          </p>
        </div>
      </div>
      <div className="flex-row text-center">
        <table>
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={row}>
                {[0, 1, 2].map((col) => {
                  const index = row * 3 + col;
                  const clientId = clientIds[index];
                  const clientInfo = clientsInfo[clientId];
                  return (
                    <td key={col}>
                      <ClientCard
                        clientInfo={{
                          client_id: clientId,
                          disk_info: clientInfo,
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientInfoTable;
