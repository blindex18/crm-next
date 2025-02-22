// app/page.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de instalar Bootstrap: npm install bootstrap

export default function Home() {
  const clientes = [
    { nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '123-456-7890' },
    { nombre: 'Ana Gómez', email: 'ana@example.com', telefono: '098-765-4321' },
  ];

  return (
    <div className="container mt-4">
      <h1 className="text-center">CRM Básico</h1>
      <button className="btn btn-primary mb-4">Agregar Cliente</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}