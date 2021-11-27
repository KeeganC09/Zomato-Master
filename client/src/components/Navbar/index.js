import React, { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { RiSearch2Line } from 'react-icons/ri';


function MobileNav() {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const [user, setUser] = useState({});
    return (
        <div className="flex w-full items-center justify-between lg:hidden">
            <div className="w-28">
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" alt="" className="w-full h-full" />
            </div>
            <div className="flex items-center gap-3 relative">
                <button className="bg-zomato-400 text-white py-2 px-3 rounded-full">Use App</button>
                {user?.fullName ? (
                    <>
                        <div onClick={() => setIsDropDownOpen((prev) => !prev)} className="border p-2 border-gray-300 text-zomato-400 w-20 h-20 rounded-full">
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/36/15/businessman-character-avatar-isolated-vector-12613615.jpg" alt="" className="w-full h-full rounded-full object-cover" />
                        </div>
                        {isDropDownOpen && (
                            <div className="absolute shadow-lg py-3 -bottom-20 -right-4 w-full bg-white z-20 flex flex-col gap-2">
                                <button>Sign Out</button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <span onClick={() => setIsDropDownOpen((prev) => !prev)} className="border p-2 border-gray-300 text-zomato-400 rounded-full">
                            <FaUserAlt className="w-full h-full;" />
                        </span>
                        {isDropDownOpen && (
                            <div className="absolute shadow-lg py-3 -bottom-20 -right-4 w-full bg-white z-20 flex flex-col gap-2">
                                <button>Sign In</button>
                                <button>Sign Up</button>
                            </div>
                        )}
                    </>
                )
                }
            </div>
        </div>
    )
}

// function LargeNav() {
//     return ()
// }

function Navbar() {
    return (
        <>
            <nav className="p-4 flex bg-white shadow-md lg:shadow-none w-full items-center">
                <MobileNav />
                {/* <LargeNav /> */}
            </nav>
        </>
    )
}

export default Navbar
