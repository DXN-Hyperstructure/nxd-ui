import Header from './components/Header';
import Footer from './components/Footer';
import Univ from './components/UnivLP';
import NXDStaking from './components/NXDStaking';
import DXNStaking from './components/DXNStaking';
import Protocol from './components/NXDProtocol';
import CappedStakingPeriod from './components/CSP';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <main>
      <Header />
      <CappedStakingPeriod />

      <Univ />

      <NXDStaking />

      <DXNStaking />

      <Protocol />

      <Footer />
      <ToastContainer />
    </main>
  );
}
