import React from 'react';
import Navbar from '../Shared/Navbar';
import useBookings from '../../hooks/useBookings';
import { Link } from 'react-router-dom';
import { da } from 'react-day-picker/locale';

const MyBookings = () => {
    const [bookings] = useBookings()
   
    console.log(bookings);
    return (
        <div>
            <div className='z-10 h-20 bg-green-900'>
           
           </div>
           <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Date</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map((item,i)=>
                                <tr key={item._id}>
                            <td>{i+1}</td>
                            <td>
                                {item.fullName}
                            </td>
                            <td>
                               {item.service_name}
                                
                            </td>
                            <td>{item.date}</td>
                            <td>
                                <Link to={`/dashboard/updateItem/${item._id}`} onClick={()=>handleUpdateItem(item)} className="btn">Update</Link>
                            </td>
                            <td>
                                <button onClick={()=>handleDeleteItem(item)} className="btn btn-ghost btn-lg">
                                    
                                </button>
                            </td>
                        </tr>
                            )
                        }
                        
                        
                       
                    </tbody>
                   
                </table>
        </div>
    );
};

export default MyBookings;