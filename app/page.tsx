'use client';

import React, { useState } from 'react';

interface Client {
  name: string;
  email: string;
  phone: string;
  note: string;
}

export default function Page() {
  const [clients, setClients] = useState<Client[]>([
    {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '123-456-7890',
      note: 'Sin nota',
    },
    {
      name: 'Ana Gómez',
      email: 'ana@example.com',
      phone: '098-765-4321',
      note: 'Sin nota',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleAddClient = () => {
    // Para evitar el error en TS, usamos la función flecha
    setCurrentClient(() => ({ name: '', email: '', phone: '', note: '' }));
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEditClient = (client: Client) => {
    setCurrentClient(client);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDeleteClient = (clientToDelete: Client) => {
    const updatedClients = clients.filter((client) => client !== clientToDelete);
    setClients(updatedClients);
  };

  const handleSaveClient = (clientData: Client) => {
    if (isEdit) {
      const updatedClients = clients.map((client) =>
        client === currentClient ? clientData : client
      );
      setClients(updatedClients);
    } else {
      setClients([...clients, clientData]);
    }
    setShowModal(false);
    setCurrentClient(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">CRM Básico (Hardcodeado)</h1>

      <button
        onClick={handleAddClient}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar Cliente
      </button>

      <table className="w-full mt-6 border-collapse">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-2 text-left text-white">Nombre</th>
            <th className="p-2 text-left text-white">Email</th>
            <th className="p-2 text-left text-white">Teléfono</th>
            <th className="p-2 text-left text-white">Nota</th>
            <th className="p-2 text-left text-white">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="p-2">{client.name}</td>
              <td className="p-2">{client.email}</td>
              <td className="p-2">{client.phone}</td>
              <td className="p-2">{client.note}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleEditClient(client)}
                  className="bg-yellow-500 text-black px-2 py-1 rounded hover:bg-yellow-400"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteClient(client)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Aquí iría tu componente Modal si lo tienes */}
      {showModal && (
        <div className="mt-4 p-4 bg-gray-700 text-white">
          {/* Formulario para editar/agregar cliente */}
          <p>Modal Placeholder</p>
        </div>
      )}
    </div>
  );
}
