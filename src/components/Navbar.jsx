import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { BsChatLeft } from 'react-icons/bs'
import { RiNotification3Line } from 'react-icons/ri'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import avatar from '../data/avatar.jpg'
import {Cart, Chat, Notification,UserProfile} from '.'
import { useStateContext } from '../contexts/ContextProvider'


const NavButton = ({title,customFunc,icon,color,dotColor}) => (
<TooltipComponent content={title} position="BottomCenter">
<button type="button" onClick={customFunc} style={{color}} className="relative text-xl rounded-full p-3 hover:bg-light-gray">
  <span style={{background: dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
    {icon}
  </button>
</TooltipComponent>
)

const Navbar = () => {
const {activeMenu,handleClick, setActiveMenu,isClicked,setIsClicked,screenSize,setScreenSize,currentColor} = useStateContext()

// Dependency array --> when this fucntion is gonna be called.
// If you put nothing in there it only gonna called at the start.
// And if you out screenSize its gonna call everytime you change screen size.
// And that would be really heavy for our application.
// We only want to figure out the size until window loads. 
 useEffect(() => {
 const handleResize = () => setScreenSize
 (window.innerWidth)
   window.addEventListener('resize',handleResize)

   // To figure out it's initial width
   handleResize()

   return () => window.addEventListener('resize',handleResize)
 }, [])

 // Track the changes of screen size
 useEffect(() => {
if (screenSize <= 900){
  setActiveMenu(false)
} else{
  setActiveMenu(true)
}
 },[screenSize])
 
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">

      {/* if the navbar is open we are gonna close it */}

    <NavButton 
    title="Menu" 
    customFunc={() => setActiveMenu(
    (prevActiveMenu) => !prevActiveMenu)}
    color={currentColor} 
    icon={<AiOutlineMenu/>}/>

    {/* To add other icons */}

    <div className="flex">
    <NavButton 
    title="Cart"
    customFunc={() => handleClick('cart')}
    color={currentColor} 
    icon={<FiShoppingCart/>}/>
    
    <NavButton 
    title="Chat"
    dotColor="#03C9D7"
    customFunc={() => handleClick('chat')}
    color={currentColor} 
    icon={<BsChatLeft/>}/>
    
    <NavButton 
    title="Notifications"
    dotColor="#03C9D7"
    customFunc={() => handleClick('notification')}
    color={currentColor} 
    icon={<RiNotification3Line/>}/>

    <TooltipComponent 
     content="profile"
     position="BottomCenter"
    >
    <div className="flex items-center gap-2 cursor-pointer p-1
    hover:bg-light-gray rounded-lg" 
    onClick={() => handleClick('userProfile')}>

    <img className="rounded-full w-8 h-8"
    src={avatar} alt="avatar"/>
    <p>
      <span className="text-gray-400 text-14">Hi,</span> {' '}
      <span className="text-gray-400 font-bold m-1 text-14">Michael</span>
    </p>
    <MdKeyboardArrowDown className="text-gray-400 text-14"/>
    </div>
    </TooltipComponent>
     
    {isClicked.cart && <Cart/>}
    {isClicked.chat && <Chat/>}
    {isClicked.notification && <Notification/>}
    {isClicked.userProfile && <UserProfile/>}

    </div>
    </div>
  )
}

export default Navbar