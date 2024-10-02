import { useContext, useState } from "react";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import DatePicker from 'react-date-picker';
import { da } from "react-day-picker/locale";
import { AuthContex } from "../AuthProvider/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useBookings from "../hooks/useBookings";



const Services = ({ service }) => {
    const { service_name, image, _id,duration } = service
    const {user} = useContext(AuthContex)
    const axiosPublic = useAxiosPublic()
    const [,refetch] = useBookings()
    // eslint-disable-next-line no-undef
    const [value, onChange] = useState(new Date());
    let formattedDate;
    if(value){
        formattedDate = value.toLocaleDateString('en-GB');
    }
    else{
        formattedDate = 'Please select a date'
    }
    


    const handleBooking = (event) =>{
        event.preventDefault()
        const form = event.target
        const fullName = form.fullName.value
        const number = form.number.value
        const email = form.email.value
        const duration = form.duration.value
        const date = form.date.value

        const bookingInfo = {
            fullName,number,email,service_name,duration,date : formattedDate
        }

        axiosPublic.post('/book',bookingInfo)
        .then(res=>{
            alert('booking confirmed')
            form.reset()
            refetch()
        })
        .catch(err=>{
            console.log(err.message);
        })

        

    }
    
    
    return (
        <div className='border-2 shadow-lg p-4 rounded'>
            
            
            <div className='w-44 flex gap-4 items-center'>
                <img src={image} alt="" />
                <h2 className='font-serif text-2xl'>{service_name}</h2>


            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-outline btn-secondary w-full mt-4" onClick={() => document.getElementById(`${_id}`).showModal()}>Book now</button>
            <dialog id={_id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-2">{service_name}</h3>
                   <form onSubmit={handleBooking}>

                   <input
                        type="text" required
                        placeholder="Full Name"
                        className="input input-bordered  w-full mb-2 mt-3 bg-gray-200"
                        name="fullName" />
                    <input required
                        type="number"
                        placeholder="Phone Number"
                        className="input input-bordered  w-full  mb-2 bg-gray-200"
                        name="number" />
                    <input required
                        type="email"
                        placeholder="Email"
                        defaultValue={user?.email}
                        className="input input-bordered  w-full  mb-2 bg-gray-200"
                        name="email" />
                        <label>Duration</label>
                    <input required
                        type="text"
                        defaultValue={duration} readOnly
                        name="duration"
                        className="input input-bordered  w-full  mb-2 bg-gray-200" />
                        <label>Date</label>
                    <input required
                        type="text"
                        placeholder="Type here"
                        name="date"
                        className="input input-bordered  w-full  mb-2 bg-gray-200  relative" value={formattedDate} readOnly />
                        <DatePicker className='absolute left-[280px] bottom-12' onChange={onChange} value={value} format="y-MM-dd" />

                        <input type="submit" className="btn btn-primary w-full" />
                   </form>


                        
                        
                </div>
            </dialog>
        </div>
    );
};

export default Services;