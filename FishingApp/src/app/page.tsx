import { authOptions } from './api/auth/[...nextauth]/route';
import Login from '../../components/loginForm/login';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AllUsersInfo from '../../components/home/home';

export default async function Home() {

  return (
    <div>
      <AllUsersInfo/>
    </div>
  );
}
