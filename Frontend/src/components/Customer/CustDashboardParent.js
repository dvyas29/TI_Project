import React, { useState } from 'react'
import CustDashBoard from './CustDashboard';
import CustNavbar from './CustNavbar';

function CustDashboardParent() {

    const [search, setSearch] = useState("");
    return (
        <div>
            <CustNavbar search={search} setSearch={setSearch}/>
            <CustDashBoard  setSearch={setSearch}search={search}/>
        </div>
    )
}

export default CustDashboardParent
