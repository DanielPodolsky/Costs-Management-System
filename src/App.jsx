// App.jsx
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import AddCostSection from './components/AddCostSection/AddCostSection';
import GenerateReportSection from './components/GenerateReportSection/GenerateReportSection';
import './App.css'

function App() {
    const [activeSection, setActiveSection] = useState('add-cost');

    return (
        <>
            <Navbar 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
            />
            {activeSection === 'add-cost' ? (
                <AddCostSection />
            ) : (
                <GenerateReportSection />
            )}
        </>
    );
}

export default App;