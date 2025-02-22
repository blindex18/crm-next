'use client';

import React, { useState, useEffect } from 'react';

export default function Page() {
  const [clients, setClients] = useState([
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
  const [currentClient, setCurrentClient] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // Verificar que currentClient se actualiza correctamente (para depuración)
  useEffect(() => {
    console.log('currentClient actualizado:', currentClient);
  }, [currentClient]);

  const handleAddClient = () => {
    setCurrentClient({ name: '', email: '', phone: '', note: '' });
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEditClient = (client) => {
    console.log('Cliente seleccionado para editar:', client);
    setCurrentClient({ ...client }); // Crear una copia para evitar mutaciones
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDeleteClient = (clientToDelete) => {
    const updatedClients = clients.filter((client) => client !== clientToDelete);
    setClients(updatedClients);
  };

  const handleSaveClient = (clientData) => {
    if (isEdit) {
      const updatedClients = clients.map((client) =>
        client === currentClient ? clientData : client
      );
      setClients(updatedClients);
    } else {
      setClients([...clients, clientData]);
    }
    setShowModal(false);
    setCurrentClient(null); // Limpiar currentClient después de guardar
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">CRM Básico</h1>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAddClient}
          >
            Agregar Cliente
          </button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Nota</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-900 text-sm font-light">
            {clients.map((client, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{client.name}</td>
                <td className="py-3 px-6 text-left">{client.email}</td>
                <td className="py-3 px-6 text-left">{client.phone}</td>
                <td className="py-3 px-6 text-left">{client.note}</td>
                <td className="py-3 px-6 text-left flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleEditClient(client)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDeleteClient(client)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setCurrentClient(null); // Limpiar currentClient al cerrar
        }}
        onSave={handleSaveClient}
        client={currentClient}
        isEdit={isEdit}
      />
    </div>
  );
}

const Modal = ({ show, onClose, onSave, client, isEdit }) => {
  const [formData, setFormData] = useState(client || { name: '', email: '', phone: '', note: '' });

  // Sincronizar formData con client cuando cambia
  useEffect(() => {
    if (client) {
      setFormData({ ...client }); // Usar una copia para evitar mutaciones
    } else {
      setFormData({ name: '', email: '', phone: '', note: '' });
    }
  }, [client]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose(); // Cerrar el modal después de guardar
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4 text-gray-900">{isEdit ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Nota</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded h-20"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {isEdit ? 'Guardar Cambios' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};