import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { useEffect,useState } from 'react'
const DashSidebar = () => {
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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active ={tab ==='profile'} icon={HiUser} label={'User'} labelcolor='dark'>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className="cursor-pointer">
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar