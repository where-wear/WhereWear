//import AuthProvider from '@/components/providers/AuthProvider';
//import HomeComponent from '@/components/sign/HomeComponent';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: {
    default: 'WhereWear',
    template: '%s | wherewear',
  },
};

const HomePage = () => {
  return (
    <>
      {/* <AuthProvider>
        <div className="p-4 mt-10 h-full w-full">
          <HomeComponent />
        </div>
      </AuthProvider> */}
      <h1>Wherewear 메인</h1>
      <Link href={'/signin'}>
        <button>로그인페이지로 이동</button>
      </Link>
    </>
  );
};

export default HomePage;
