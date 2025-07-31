import React, { useEffect, useState } from "react";
import api from "../services/api";
import { FaUser, FaUserFriends, FaClipboardList, FaCheckCircle } from "react-icons/fa";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const userRes = await api.get("/admin/users");
      const reqRes = await api.get("/admin/requests");
      const statRes = await api.get("/admin/dashboard");
      setUsers(userRes.data);
      setRequests(reqRes.data);
      setStats(statRes.data);
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  };

  const updateRole = async (id, role) => {
    await api.put(`/admin/users/${id}?role=${role}`);
    fetchAll();
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await api.delete(`/admin/users/${id}`);
      fetchAll();
    }
  };

  const updateRequest = async (id, status) => {
    await api.put(`/admin/requests/${id}?status=${status}`);
    fetchAll();
  };

  return (
    <div className="container py-5">
      {/* Heading with shadow */}
      <div className="text-center mb-5">
        <h2
          className="fw-bold"
          style={{
            color: "#0d6efd",
            textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            padding: "8px 16px",
            display: "inline-block",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          Admin Dashboard
        </h2>
        <p className="text-muted small mt-2">
          Manage users and monitor blood request activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        {/* Donors */}
        <div className="col-md-3 col-6">
          <div
            className="card text-center p-3 border-0 shadow stat-card"
            style={{
              background: "linear-gradient(135deg, #007bff, #0056b3)",
              color: "#fff",
              borderRadius: "15px",
              transition: "transform 0.2s ease",
            }}
          >
            <FaUser size={30} className="mb-2" />
            <h6>Total Donors</h6>
            <h3 className="fw-bold">{stats.totalDonors ?? 0}</h3>
          </div>
        </div>

        {/* Receivers */}
        <div className="col-md-3 col-6">
          <div
            className="card text-center p-3 border-0 shadow stat-card"
            style={{
              background: "linear-gradient(135deg, #28a745, #1e7e34)",
              color: "#fff",
              borderRadius: "15px",
              transition: "transform 0.2s ease",
            }}
          >
            <FaUserFriends size={30} className="mb-2" />
            <h6>Total Receivers</h6>
            <h3 className="fw-bold">{stats.totalReceivers ?? 0}</h3>
          </div>
        </div>

        {/* Pending */}
        <div className="col-md-3 col-6">
          <div
            className="card text-center p-3 border-0 shadow stat-card"
            style={{
              background: "linear-gradient(135deg, #ffc107, #e0a800)",
              color: "#212529",
              borderRadius: "15px",
              transition: "transform 0.2s ease",
            }}
          >
            <FaClipboardList size={30} className="mb-2" />
            <h6>Pending Requests</h6>
            <h3 className="fw-bold">{stats.pendingRequests ?? 0}</h3>
          </div>
        </div>

        {/* Fulfilled */}
        <div className="col-md-3 col-6">
          <div
            className="card text-center p-3 border-0 shadow stat-card"
            style={{
              background: "linear-gradient(135deg, #17a2b8, #117a8b)",
              color: "#fff",
              borderRadius: "15px",
              transition: "transform 0.2s ease",
            }}
          >
            <FaCheckCircle size={30} className="mb-2" />
            <h6>Fulfilled Requests</h6>
            <h3 className="fw-bold">{stats.fulfilledRequests ?? 0}</h3>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <h4 className="mb-3 text-secondary">All Users</h4>
      <div className="table-responsive shadow rounded mb-5">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No users found.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    className={`badge ${
                      u.role === "admin"
                        ? "bg-danger"
                        : u.role === "donor"
                        ? "bg-primary"
                        : "bg-success"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                  >
                    <option value="donor">Donor</option>
                    <option value="receiver">Receiver</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Requests Table */}
      <h4 className="mb-3 text-secondary">Blood Requests</h4>
      <div className="table-responsive shadow rounded">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Requester</th>
              <th>Blood Group</th>
              <th>Hospital</th>
              <th>Status</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-muted py-3">
                  No requests found.
                </td>
              </tr>
            )}
            {requests.map((r) => (
              <tr key={r.id}>
                <td>{r.requesterEmail}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.hospital}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "fulfilled"
                        ? "bg-success"
                        : r.status === "pending"
                        ? "bg-warning text-dark"
                        : "bg-secondary"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>
                  <select
                    className="form-select form-select-sm"
                    value={r.status}
                    onChange={(e) => updateRequest(r.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
