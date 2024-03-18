import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Register from '../../../components/registerForm/registerForm';

const Registerpage = async () => {
  const session = await getServerSession(authOptions)
  if(session){
    redirect('/dashboard')
  }
  return <Register />;
};

export default Registerpage;
