import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Default from "@/components/pages/default.tsx";
import Admin from "@/components/pages/admin.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;
