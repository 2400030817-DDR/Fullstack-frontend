import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home/Home';
import DonateTypes from './pages/DonateTypes/DonateTypes';
import DonateMoney from './pages/DonateMoney/DonateMoney';
import DonateClothes from './pages/DonateClothes/DonateClothes';
import DonateEssentials from './pages/DonateEssentials/DonateEssentials';
import RequestHelp from './pages/RequestHelp/RequestHelp';
import Tracking from './pages/Tracking/Tracking';
import Support from './pages/Support/Support';
import Transparency from './pages/Transparency/Transparency';
import Emergency from './pages/Emergency/Emergency';
import Community from './pages/Community/Community';
import DonorDashboard from './pages/Dashboard/DonorDashboard';
import RecipientDashboard from './pages/Dashboard/RecipientDashboard';
import VolunteerDashboard from './pages/Dashboard/VolunteerDashboard';
import AdminDashboard from './pages/Dashboard/AdminDashboard';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<DonateTypes />} />
        <Route path="/donate/money" element={<DonateMoney />} />
        <Route path="/donate/clothes" element={<DonateClothes />} />
        <Route path="/donate/essentials" element={<DonateEssentials />} />
        <Route path="/request-help" element={<RequestHelp />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/support" element={<Support />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<DonorDashboard />} />
        <Route path="/dashboard/donor" element={<DonorDashboard />} />
        <Route path="/dashboard/recipient" element={<RecipientDashboard />} />
        <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}
