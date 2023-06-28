import LoadingScreen from '@/components/ui/LoadingScreen';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';

interface Props {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}

const Wrapper = ({ children }: Props) => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setPageLoading(true);
    const handleRouteComplete = () => setPageLoading(false);
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteComplete);

    return () => {
      router.events.off('routeChangeStart', () => handleRouteChange);
      router.events.off('routeChangeStart', () => handleRouteComplete);
    };
  });

  return (
    <div className="bg-[#f5f5f7] min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        {pageLoading ? <LoadingScreen /> : children}
      </div>
      <Footer />
    </div>
  );
};

export default Wrapper;
