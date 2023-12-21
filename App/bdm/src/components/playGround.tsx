/* import { useState } from "react";

const MyForm: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
    });
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      const postData = new FormData();
      postData.append('name', formData.name);
      postData.append('email', formData.email);
      postData.append('message', formData.message);
  
      fetch('/api/endpoint', {
        method: 'POST',
        body: postData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
        })
        .catch((error) => {
          // Handle any errors
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default MyForm; */