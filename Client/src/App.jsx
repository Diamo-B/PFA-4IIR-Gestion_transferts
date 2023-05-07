import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ClientAuthOutlet} from "./tools/ClientAuthOutlet";
import {AgentAuthOutlet} from './tools/AgentAuthOutlet';
import {SuperAgentAuthOutlet} from './tools/SuperAgentAuthOutlet';
import Login from "./Login";
import Home from "./Home";
import AdminLayout from './admin/Layout';
import Users from "./admin/Users";
import Reservations from "./admin/Reservations";
import NotFound from './NotFound';
import AdminHome from "./admin/AdminHome";
import Authorizations from "./admin/Authorizations";
import Locations from "./admin/Locations";
import Vehicules from "./admin/Vehicules";
import Periods from "./admin/Periods"
import Extras from "./admin/Extras";
import Billing from "./admin/Billing";
import Settings from "./admin/Settings";


function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <span id="darkModeSwitch">
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<ClientAuthOutlet />} >
              <Route index element={<Home />} />
            </Route>
            
            <Route path="/admin" element={<AgentAuthOutlet />} >
              //TODO: Add routes for each option on the admin's navbar
              <Route index element={<AdminLayout> <AdminHome/> </AdminLayout>} />            
              <Route path="/admin/reservation" element={<AdminLayout> <Reservations/> </AdminLayout>} />
              <Route path="/admin/location" element={<AdminLayout> <Locations/> </AdminLayout>}/>
              <Route path="/admin/vehicule" element={<AdminLayout> <Vehicules/> </AdminLayout>}/>
              <Route path="/admin/period" element={<AdminLayout> <Periods/> </AdminLayout>} />
              <Route path="/admin/extra" element={<AdminLayout> <Extras/> </AdminLayout>} />
              <Route path="/admin/billing" element={<AdminLayout> <Billing/> </AdminLayout>} />
              <Route path="/admin/settings" element={<AdminLayout> <Settings/> </AdminLayout>} />
            </Route>

            <Route path="/admin" element={<SuperAgentAuthOutlet />}>
              <Route path="/admin/user" element={<AdminLayout> <Users/> </AdminLayout>} />
              <Route path="/admin/authorization" element={<AdminLayout> <Authorizations/> </AdminLayout>}/>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </span>
    </QueryClientProvider>
  );
}

export default App;
