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
      <Link href="/signin">
        <div className="home-container">
          <img src="/image/home_main_text.png" className="home-main-text" />
          <img src="/image/home_sub_text.png" className="home-sub-text" />
          <img src="/image/home_W.png" className="home-w" />
        </div>
      </Link>
    </>
  );
};

export default HomePage;
