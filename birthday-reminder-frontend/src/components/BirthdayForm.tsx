import axios from "axios";
import { useState } from "react";

const BirthdayForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5051/birthdays`, {
        username,
        email,
        dateOfBirth,
      });

      if (response.status === 201) {
        console.log("celebrants added successfully!");
        setUsername("");
        setEmail("");
        setDateOfBirth("");
      } else {
        console.error("Error adding celebrants:", response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.error("Error adding celebrants:", error);
    }

    setUsername("");
    setEmail("");
    setDateOfBirth("");
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={handleSubmit}>
        <div className="label-input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="enter username"
            required
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter email"
            required
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="text"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            placeholder="yyyy-mm-dd"
          />
        </div>

        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Add Birthday Reminder
        </button>
      </form>
    </div>
  );
};

export default BirthdayForm;
