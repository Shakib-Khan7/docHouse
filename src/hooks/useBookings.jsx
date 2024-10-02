import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import { AuthContex } from '../AuthProvider/AuthProvider';

const useBookings = () => {
   const axiosSecure = useAxiosSecure()
   const {user} = useContext(AuthContex)

   const {data : bookings = [],refetch} = useQuery({
    queryKey : ['bookings'],
    queryFn :async ()=>{
        const response = await axiosSecure.get(`/bookings?email=${user.email}`)
        return response.data
    }
   })
   return [bookings,refetch]


};

export default useBookings;