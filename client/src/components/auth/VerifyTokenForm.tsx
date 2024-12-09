import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authenService from '../../services/authen.service';

export default function VerifyTokenForm() {
  const [tokenInput, setTokenInput] = useState(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const[show, setShow] = useState(false);
  const navigate = useNavigate();
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  console.log('tokenInput', tokenInput);

  const handleChange = (e: any, index: number) => {
    const value = e.target.value;
    if (/^\d$/.test(value) || value === '') {
      const newTokenInput = [...tokenInput];
      newTokenInput[index] = value;
      setTokenInput(newTokenInput);
      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: any, index: number) => {
    if (e.key === 'Backspace' && tokenInput[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const token = tokenInput.join('');
    try {
      const response = await authenService.verifyToken(token);
      if (response.EC === 0) {
        navigate('/reset-password/' + token);
      } else {
        toast(response.EM, { type: 'error' });
      }
    } catch (error) {
      toast('Verification failed', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div
      className={`duration-700 max-w-[420px] w-full bg-white shadow-xl ${
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
      } px-9 py-11 flex flex-col mx-auto rounded-xl`}
    >
      <h3 className="text-[#000] text-sm font-normal">Verify Token</h3>
      <h2 className="text-[#000] text-2xl font-semibold mb-5">Enter the 6-digit code</h2>
      <div className="flex gap-1 justify-between mb-5">
        {tokenInput.map((digit, index) => (
          <TextField
            key={index}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            inputProps={{
              maxLength: 1,
              style: { textAlign: 'center', fontSize: '24px', width: '40px', height: '40px' },
            }}
            inputRef={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        variant="contained"
        color="primary"
        style={{ textTransform: 'none', fontSize: '20px', fontWeight: 'bold', borderRadius: '4px', padding: '8px 0', width: '100%', cursor: 'pointer' }}
        onClick={handleSubmit}
        disabled={loading}
      >
        Verify
      </Button>
    </div>
  );
}