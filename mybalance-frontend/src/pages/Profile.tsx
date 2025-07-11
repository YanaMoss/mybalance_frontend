import { useState,useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendCode = async () => {
    try {
      await axios.post('http://localhost:3000/phone/send-code', { phone });
      setIsCodeSent(true);
      console.log(`Надсилаємо SMS на номер: ${phone}`);
      setMessage('Код надіслано на ваш номер');
    } catch (error) {
      console.error(error);
      setMessage('Помилка надсилання SMS');
    }
  };

  const handleVerify = async () => {
    try {
      await axios.post('http://localhost:3000/phone/verify-code', { phone, code });
      setMessage('Телефон підтверджено!');
    } catch (error) {
      console.error(error);
      setMessage('Невірний код');
    }
  };

  useEffect(() => {
    console.log('useEffect для завантаження профілю запустився');
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('http://localhost:3000/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
        setPhone(res.data.phone || '');
      })
      .catch(() => {
        setMessage('Не вдалося завантажити профіль');
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Особистий кабінет</h2>
      <p><strong>Імʼя:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Номер телефону</label>
        <input
          type="tel"
          id="phone"
          className="form-control"
          placeholder="+380XXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {!isCodeSent ? (
        <button className="btn btn-primary" onClick={handleSendCode}>
          Надіслати код
        </button>
      ) : (
        <>
          <div className="mb-3 mt-3">
            <label htmlFor="code" className="form-label">Код з SMS</label>
            <input
              type="text"
              id="code"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={handleVerify}>
            Підтвердити
          </button>
        </>
      )}

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default Profile;