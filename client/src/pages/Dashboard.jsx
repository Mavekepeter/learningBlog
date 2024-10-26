import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPost from '../components/DashPost'
import DashUsers from '../components/DashUsers'
const Dashboard = () => {
  const location = useLocation()
  const [tab, setTab] = useState()
  useEffect(()=>{
    const urlparams = new URLSearchParams(location.search);
    const tabFromUrl = urlparams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className="md:w-56">
        {/* sidebar */}
        <DashSidebar/>
      </div>
      {/* profile ... */}
      {tab ==='profile' && <DashProfile/>}
      {/* post... */}
      {tab === 'posts' && <DashPost/>}
      {/* user */}
      {tab === 'users' && <DashUsers/>}
    </div>
  )
}

export default Dashboard