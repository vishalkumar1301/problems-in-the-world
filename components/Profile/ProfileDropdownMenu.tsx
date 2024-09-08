import { User } from '@/lib/interfaces/User';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';

interface ProfileDropdownMenuProps {
  user: User;
}

export default function ProfileDropdownMenu({ user }: ProfileDropdownMenuProps) {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex items-center space-x-2">
      <span>{user.username}</span>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}