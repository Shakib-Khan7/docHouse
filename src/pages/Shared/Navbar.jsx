import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useBookings from '../../hooks/useBookings';
import { AuthContex } from '../../AuthProvider/AuthProvider';

const Navbar = () => {
    const [bookings] = useBookings()
    const location = useLocation()
    const {logOut,user} = useContext(AuthContex)
    console.log(bookings);
    const onlyLogo = location.pathname.includes('login') || location.pathname.includes('signup')
    const bookingsRoute = location.pathname.includes('bookings')

    const handleLogOut = () =>{
        logOut()
        .then(res=>{
            console.log(res.user);
        })
    }


    const navItems = <>
        <>
            <li>
                <Link to='/'>
                    Home
                </Link>
            </li>
            {user && <li>
                <Link to='/bookings/myBookings' className="">
                    My bookings
                    <div className="badge badge-secondary">+{bookings.length}</div>
                </Link>
            </li>}
            {!user && <li>
                <Link to='/login'>Login</Link>
            </li>}
           {!user &&  <li>
                <Link to='/signup'>Signup</Link>
            </li>}
            <li><a>Nice</a></li>
        </>
    </>
    return (
        <div className=''>
            <div className={ !onlyLogo ? "navbar text-white fixed z-10 bg-green-900 bg-opacity-90" : "navbar text-white fixed z-10 bg-slate-200 bg-opacity-0"}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {
                                !onlyLogo ? navItems : <></>
                            }
                        </ul>
                    </div>
                    <Link to='/' className={!onlyLogo ? "btn btn-ghost text-xl" : "btn btn-ghost text-xl text-black"}>DocHouse</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {
                            !onlyLogo  ? navItems : <></>
                        }
                        {
                            
                        }

                    </ul>
                </div>
                <div className="navbar-end">
                    {user && <button onClick={handleLogOut} className="btn">Logout</button>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;