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
      <Link href="/signin" style={{ textDecoration: 'none' }}>
        <div className="home-container">
          <div
            style={{ whiteSpace: 'pre-line' }}
            className="home-main-text"
          >{`어디에 \n 뭐 입고 가지?`}</div>

          <div className="home-sub-text">WHERE WEAR | 웨어웨어</div>
          <img src="/image/home_W.png" className="home-w" />
        </div>
      </Link>
    </>
  );
};

export default HomePage;
