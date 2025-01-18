import './Navbar.css'

function Navbar( { activeSection, onSectionChange } ) {

    const handleClick = (section) => {
        onSectionChange(section);
    }


    return (
        <>
            {/* NavBar */}
            <nav className="navbar">
                <div className="nav-brand">Cost Manager</div>
                <div className="nav-links">
                    <a href="#" id="addCostLink" className={`nav-link ${activeSection === 'add-cost' ? 'active' : '' } btn`} onClick={() => handleClick('add-cost')}>
                        Add Cost
                    </a>
                    <a href="#" id="generateReportLink" className={`nav-link ${activeSection === 'generate' ? 'active' : '' } btn`} onClick={() => handleClick('generate')}>
                        Generate Report
                    </a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;