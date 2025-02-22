import React from 'react';

const Page = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">CRM Básico (Hardcodeado)</h1>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Agregar Cliente
          </button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Nota</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">Juan Pérez</td>
              <td className="py-3 px-6 text-left">juan@example.com</td>
              <td className="py-3 px-6 text-left">123-456-7890</td>
              <td className="py-3 px-6 text-left">Sin nota</td>
              <td className="py-3 px-6 text-left">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">Ana Gómez</td>
              <td className="py-3 px-6 text-left">ana@example.com</td>
              <td className="py-3 px-6 text-left">098-765-4321</td>
              <td className="py-3 px-6 text-left">Sin nota</td>
              <td className="py-3 px-6 text-left">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                  Editar
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                  Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;