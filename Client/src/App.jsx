import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import AdminHome from './admin/Home';
import NotFound from './NotFound'
import {ClientAuthOutlet} from "./tools/ClientAuthOutlet";
import {AgentAuthOutlet} from './tools/AgentAuthOutlet';

function App() {
  return (
    <span id="darkModeSwitch">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<ClientAuthOutlet />} >
            <Route index element={<Home />} />
          </Route>
          
          <Route path="/admin" element={<AgentAuthOutlet />} >
            <Route index element={<AdminHome />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
    </span>

  );
}

export default App;
