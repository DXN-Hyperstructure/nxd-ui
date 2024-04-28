import Header from './components/Header';
import Footer from './components/Footer';
import Univ from './components/UnivLP';
import NXDStaking from './components/NXDStaking';
import DXNStaking from './components/DXNStaking';
import Protocol from './components/NXDProtocol';
// import Charts from './components/charts';
import CappedStakingPeriod from './components/CSP';
import ReferralBlock from './components/ReferralBlock';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main>
      <Header />
      <ReferralBlock />
      <CappedStakingPeriod />

      <Univ />

      {/* Third Block */}
      <NXDStaking />

      {/* Fourth Block */}

      <DXNStaking />
      {/* Fifth Block */}

      <Protocol />
      {/* <Charts /> */}

      <Footer />
      <ToastContainer />
    </main>
  );
}
