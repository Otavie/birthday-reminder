import { useState } from "react";

const BirthdayForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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
            required
          />
        </div>

        <div className="label-input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default BirthdayForm;
