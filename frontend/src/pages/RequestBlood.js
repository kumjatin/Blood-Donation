import  { useState } from 'react';
import api from '../services/api'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestBlood = () => {
  const [form, setForm] = useState({
    bloodGroup: '',
    hospital: '',
    contact: '',
    urgency: '',
    status: 'pending',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        toast.error('Please login to submit a request.');
        return;
      }

      const requestWithEmail = { ...form, requesterEmail: email };

      await api.post('/receiver/requests', requestWithEmail);
      toast.success('🩸 Blood request submitted successfully!');

      setForm({
        bloodGroup: '',
        hospital: '',
        contact: '',
        urgency: '',
        status: 'pending',
      });
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <h3 className="mb-4 text-danger fw-bold text-center">Request Blood</h3>
      <ToastContainer position="top-center" autoClose={3000} />
      <form onSubmit={handleSubmit} className="row g-4 shadow p-4 rounded bg-light">
        <div className="col-md-6">
          <input
            type="text"
            name="bloodGroup"
            className="form-control form-control-lg"
            placeholder="Blood Group (e.g. A+)"
            value={form.bloodGroup}
            onChange={handleChange}
            required
            pattern="^(A|B|AB|O)[+-]$"
            title="Enter valid blood group (e.g. A+, O-, AB+)"
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            name="hospital"
            className="form-control form-control-lg"
            placeholder="Hospital Name"
            value={form.hospital}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <input
            type="tel"
            name="contact"
            className="form-control form-control-lg"
            placeholder="Contact Number"
            value={form.contact}
            onChange={handleChange}
            required
            pattern="^[0-9]{10,15}$"
            title="Enter valid contact number"
          />
        </div>
        <div className="col-md-6">
          <select
            name="urgency"
            className="form-select form-select-lg"
            value={form.urgency}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Urgency
            </option>
            <option value="high">High</option>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className="col-12 text-center">
          <button type="submit" className="btn btn-danger btn-lg px-5">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestBlood;
