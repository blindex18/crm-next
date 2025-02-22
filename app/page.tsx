'use client'; // Asegúrate de agregar esta directiva si usas hooks como useState

import React, { useState } from 'react';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => {
  const [clientes, setClientes] = useState([
    { nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '123-456-7890', nota: 'Sin nota' },
    { nombre: 'Ana Gómez', email: 'ana@example.com', telefono: '098-765-4321', nota: 'Sin nota' },
  ]);
  const [clienteActual, setClienteActual] = useState({ nombre: '', email: '', telefono: '', nota: '' });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setClienteActual({ ...clienteActual, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientes([...clientes, clienteActual]);
    setClienteActual({ nombre: '', email: '', telefono: '', nota: '' });
    setShowModal(false);
  };

  return (
    <div>
      <h1>CRM Básico (Hardcodeado)</h1>
      <Button onClick={() => setShowModal(true)}>Agregar Cliente</Button>

      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{cliente.nota}</td>
              <td>
                <Button variant="warning">Editar</Button>{' '}
                <Button variant="danger">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={clienteActual.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clienteActual.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={clienteActual.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nota</Form.Label>
              <Form.Control
                as="textarea"
                name="nota"
                value={clienteActual.nota}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;