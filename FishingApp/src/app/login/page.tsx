import { authOptions } from '.././api/auth/[...nextauth]/route';
import Login from '../../../components/loginForm/login';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div>
      <Login />
    </div>
  );
}
