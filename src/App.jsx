import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import Chat from "./pages/Chat";

function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/chat" element={<Chat />} />
      </Routes>
    </DashboardLayout>
  );
}

export default App;
