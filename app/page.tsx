"use client";
import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Modal, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  // Funciones auxiliares para emojis y colores
  const getEstadoEmoji = (estado) => {
    switch (estado) {
      case 'Cliente':
        return '🟢';
      case 'Cliente Potencial':
        return '🔵';
      case 'Lead':
        return '🟡';
      case 'Perdido':
        return '🔴';
      default:
        return '';
    }
  };

  const getPrioridadEmoji = (prioridad) => {
    switch (prioridad) {
      case 'Alta':
        return '🔥';
      case 'Media':
        return '⚡';
      case 'Baja':
        return '❄️';
      default:
        return '';
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'Alta':
        return 'text-danger';
      case 'Media':
        return 'text-warning';
      case 'Baja':
        return 'text-success';
      default:
        return '';
    }
  };

  const getFuenteEmoji = (fuente) => {
    switch (fuente) {
      case 'Sitio Web':
        return '🌐';
      case 'Referencia':
        return '👥';
      case 'Evento':
        return '🎉';
      default:
        return '';
    }
  };

  // Estado inicial con clientes hardcodeados
  const [clientes, setClientes] = useState([
    { id: 1, nombre: 'Juan Pérez', email: 'juan@example.com', telefono: '123-456-7890', nota: '', estado: 'Lead', fuente: 'Sitio Web', ultimaInteraccion: '2023-10-01', prioridad: 'Media' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@example.com', telefono: '098-765-4321', nota: '', estado: 'Cliente', fuente: 'Referencia', ultimaInteraccion: '2023-09-15', prioridad: 'Alta' },
  ]);

  // Estados para controlar el modal y la edición
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState(false);
  const [clienteActual, setClienteActual] = useState({
    id: null,
    nombre: '',
    email: '',
    telefono: '',
    nota: '',
    estado: '',
    fuente: '',
    ultimaInteraccion: '',
    prioridad: ''
  });

  // Abrir el modal (para agregar o editar)
  const handleShowModal = (cliente = null) => {
    if (cliente) {
      setEditando(true);
      setClienteActual(cliente);
    } else {
      setEditando(false);
      setClienteActual({ id: null, nombre: '', email: '', telefono: '', nota: '', estado: '', fuente: '', ultimaInteraccion: '', prioridad: '' });
    }
    setShowModal(true);
  };

  // Cerrar el modal
  const handleCloseModal = () => setShowModal(false);

  // Guardar o actualizar un cliente
  const handleGuardarCliente = () => {
    if (clienteActual.nombre && clienteActual.email && clienteActual.telefono) {
      if (editando && clienteActual.id) {
        // Actualizar cliente existente
        setClientes(clientes.map(c => (c.id === clienteActual.id ? clienteActual : c)));
      } else {
        // Agregar nuevo cliente con ID único
        const nuevoId = clientes.length ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
        setClientes([...clientes, { ...clienteActual, id: nuevoId }]);
      }
      handleCloseModal();
    } else {
      alert('Por favor, completa todos los campos obligatorios (Nombre, Email, Teléfono)');
    }
  };

  // Eliminar un cliente
  const handleEliminarCliente = (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setClienteActual({ ...clienteActual, [name]: value });
  };

  return (
    <div className="container mt-4">
      <Head>
        <title>CRM Básico</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-center">CRM Básico (Hardcodeado)</h1>
      <Button variant="primary" onClick={() => handleShowModal()}>
        Agregar Cliente
      </Button>

      {/* Tabla de clientes */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Fuente</th>
            <th>Última Interacción</th>
            <th>Prioridad</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.nombre}</td>
              <td>{cliente.email}</td>
              <td>{cliente.telefono}</td>
              <td>{getEstadoEmoji(cliente.estado)} {cliente.estado}</td>
              <td>{getFuenteEmoji(cliente.fuente)} {cliente.fuente}</td>
              <td>{cliente.ultimaInteraccion ? cliente.ultimaInteraccion : '⚠️ Sin interacción'}</td>
              <td className={getPrioridadColor(cliente.prioridad)}>{getPrioridadEmoji(cliente.prioridad)} {cliente.prioridad}</td>
              <td>{cliente.nota ? cliente.nota : '🚨 Sin nota'}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowModal(cliente)}>
                  Editar
                </Button>{' '}
                <Button variant="danger" onClick={() => handleEliminarCliente(cliente.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar o editar cliente */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editando ? 'Editar Cliente' : 'Agregar Cliente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={clienteActual.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={clienteActual.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={clienteActual.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado de Contacto</Form.Label>
              <Form.Select name="estado" value={clienteActual.estado} onChange={handleChange}>
                <option value="">Selecciona un estado</option>
                <option value="Lead">Lead</option>
                <option value="Cliente Potencial">Cliente Potencial</option>
                <option value="Cliente">Cliente</option>
                <option value="Perdido">Perdido</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fuente de Contacto</Form.Label>
              <Form.Select name="fuente" value={clienteActual.fuente} onChange={handleChange}>
                <option value="">Selecciona una fuente</option>
                <option value="Sitio Web">Sitio Web</option>
                <option value="Referencia">Referencia</option>
                <option value="Evento">Evento</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Última Interacción</Form.Label>
              <Form.Control
                type="date"
                name="ultimaInteraccion"
                value={clienteActual.ultimaInteraccion}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Prioridad</Form.Label>
              <Form.Select name="prioridad" value={clienteActual.prioridad} onChange={handleChange}>
                <option value="">Selecciona una prioridad</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nota (opcional)</Form.Label>
              <Form.Control
                type="text"
                name="nota"
                value={clienteActual.nota}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGuardarCliente}>
            {editando ? 'Guardar Cambios' : 'Agregar Cliente'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}