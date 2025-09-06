import { useState, FC, FormEvent } from 'react';
import { useUserStore } from '@/entities/user';
import { Input, Button } from '@/shared/ui';

interface Props {
  onLogin: () => void;
}

export const LoginForm: FC<Props> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useUserStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    await login(name.trim());
    setLoading(false);
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto mt-16 space-y-4">
      <Input
        label="Your Name"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        autoFocus
      />
      <Button type="submit" disabled={loading || !name.trim()}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
