import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Todos.css';

const Todos = () => {
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [curPage, setCurPage] = useState(1);

  // สำหรับ Modal
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [nextId, setNextId] = useState(1);

  // ฟังก์ชัน fetchTodos
  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return [];
    }
  };

  // โหลด todos จาก API
  useEffect(() => {
    const loadTodos = async () => {
      const data = await fetchTodos();
      setTodosRaw(data);
      setItemPerPage(10)
      setNextId(calcNextId(data));
    };
    loadTodos();
  }, []);

  // ฟิลเตอร์ข้อมูล todos + อัปเดต pagination
  useEffect(() => {
    let filteredTodos = todosRaw;
    if (onlyWaiting) {
      filteredTodos = todosRaw.filter((todo) => !todo.completed);
    }
    setTodos(filteredTodos);
    setCurPage(1); // reset หน้าทุกครั้งที่ filter
    setNextId(calcNextId(filteredTodos));
  }, [todosRaw, onlyWaiting]);

  // คำนวณ ID ถัดไป (ไม่ซ้ำ)
  const calcNextId = (list) => {
    const usedIds = new Set(list.map(t => t.id));
    let id = 1;
    while (usedIds.has(id)) id++;
    return id;
  };

  const numPages = Math.ceil(todos.length / itemPerPage) || 1;
  const paginatedTodos = todos.slice(
    (curPage - 1) * itemPerPage,
    curPage * itemPerPage
  );

  // ✅ กด waiting ให้กลายเป็น done
  const waitingClicked = (id) => {
    const updated = todosRaw.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );
    setTodosRaw(updated);
  };

  // ✅ ลบ Todo เฉพาะหน้าปัจจุบัน
  const deleteClicked = (id) => {
    const start = (curPage - 1) * itemPerPage;
    const end = curPage * itemPerPage;
    const currentPageTodos = todosRaw.slice(start, end);
    const updatedPageTodos = currentPageTodos.filter(todo => todo.id !== id);
    const updatedTodosRaw = [
      ...todosRaw.slice(0, start),
      ...updatedPageTodos,
      ...todosRaw.slice(end),
    ];
    setTodosRaw(updatedTodosRaw);
  };

  // ✅ เพิ่ม Todo ใหม่
  const handleAddTodo = () => {
    if (!newTitle.trim()) return;
    const newTodo = {
      id: nextId,
      title: newTitle,
      completed: false,
    };
    setTodosRaw([newTodo, ...todosRaw]);
    setNewTitle('');
    setShowModal(false);
    console.log('Added Todo:', newTodo); // แสดงใน console
  };

  return (
    <div className="container mt-3">
      {/* Filter Section */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Show only incomplete tasks"
          checked={onlyWaiting}
          onChange={(e) => setOnlyWaiting(e.target.checked)}
        />

        <Form.Select
          aria-label="Items per page"
          className="w-25"
          value={itemPerPage}
          onChange={(e) => setItemPerPage(Number(e.target.value))}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </Form.Select>
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th className="text-center" style={{ width: '4rem' }}>ID</th>
              <th className="text-center">Title</th>
              <th className="text-center" style={{ width: '10rem' }}>Status</th>
              <th className="text-center" style={{ width: '14rem' }}>
                Actions
                <Button
                  variant="success"
                  size="sm"
                  className="ms-2"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-plus"></i>
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTodos.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No todos found.
                </td>
              </tr>
            ) : (
              paginatedTodos.map((todo) => (
                <tr key={todo.id}>
                  <td className="text-center">{todo.id}</td>
                  <td>{todo.title}</td>
                  <td className="text-center">
                    {todo.completed ? (
                      <span className="text-success fw-bold">Done</span>
                    ) : (
                      <span className="text-warning fw-bold">Waiting</span>
                    )}
                  </td>
                  <td className="text-center">
                    {!todo.completed && (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => waitingClicked(todo.id)}
                      >
                        Waiting
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      onClick={() => deleteClicked(todo.id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Page Control Section */}
      <div className="text-center mt-3">
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        <Button
          variant="outline-primary"
          className="ms-2"
          onClick={() => setCurPage(Math.max(1, curPage - 1))}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        <span className="mx-3">
          {curPage} / {numPages}
        </span>
        <Button
          variant="outline-primary"
          className="me-2"
          onClick={() => setCurPage(Math.min(numPages, curPage + 1))}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        <Button
          variant="outline-primary"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>

      {/* Modal สำหรับเพิ่ม Todo */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-plus"></i> Add Todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>ID (auto):</Form.Label>
            <Form.Control type="number" value={nextId} readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your todo title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTodo}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todos;
 