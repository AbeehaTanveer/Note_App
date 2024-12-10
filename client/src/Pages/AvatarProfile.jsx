import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { initialWords } from '../Logics/NameLogo';
import { handleSuccess } from '../Logics/Toast';
import { useNavigate } from 'react-router-dom';
import { SearchValueContext } from '../context/SearchContext';
const AvatarProfile = () => {
  const { setLoggedIn } = useContext(SearchValueContext);
  const navigate=useNavigate()
  const userName = localStorage.getItem("name");

const handleLogout=()=>{
localStorage.clear("jwt")
localStorage.clear("name")
handleSuccess("Logout Success")

setTimeout(() => {
    setLoggedIn(false)
    navigate('/')
  }, 1000);
}

  return (
    <div className='flex items-center'>
      


   <Avatar  className='uppercase'  sx={{ bgcolor:"#ac2d51" }}>
    {initialWords(userName)}
    </Avatar> 
   <div className='font-bold ml-2 mr-4'> {userName}</div>
   <button onClick={handleLogout} className="btn-hover rounded-xl">
      <span>logout</span>
    </button>

    </div>
  )
}

export default AvatarProfile
