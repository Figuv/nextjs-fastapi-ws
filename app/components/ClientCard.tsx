import React from "react";
import { CiHardDrive } from "react-icons/ci";

export default function ClientCard({ clientInfo }: any) {
  const client_id = clientInfo.client_id;
  const disk_info = clientInfo.disk_info;

  // Verificar si disk_info está definido antes de acceder a sus propiedades
  const total_space = disk_info ? disk_info.total_space / (1024 * 1024 * 1024) : 0;
  const used_space = disk_info ? disk_info.used_space / (1024 * 1024 * 1024) : 0;
  const free_space = disk_info ? disk_info.free_space / (1024 * 1024 * 1024) : 0;

  return (
    <div className={`flex-row bg-gray-100 h-64 w-72 rounded-2xl m-2 py-5 items-center justify-center ${disk_info ? '' : 'text-red-500'}`}>
      <p className="font-bold self-center">{client_id}</p>
      <CiHardDrive className={`text-9xl place-self-center mx-20 ${disk_info ? '' : 'text-red-500'}`} />
      {disk_info ? (
        <>
          <p className="text-sm">Disco total: {total_space.toFixed(2)} GB</p>
          <p className="text-sm">Disco usado: {used_space.toFixed(2)} GB</p>
          <p className="text-sm">Disco libre: {free_space.toFixed(2)} GB</p>
        </>
      ) : (
        <p className="text-sm">No reportado</p>
      )}
    </div>
  );
}
