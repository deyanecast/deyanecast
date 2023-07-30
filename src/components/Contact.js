import React, { useState } from 'react';
import '../style.css';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(`Nombre: ${name}, Email: ${email}, Body: ${body}`);
    // Aquí puedes implementar el código para enviar el correo
  };

  return (
    <div className="contact">
      <h1>Want to get in touch?</h1>
      <h2>Drop me a line!</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <textarea
          name="body"
          placeholder="Messagge"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Contact;
