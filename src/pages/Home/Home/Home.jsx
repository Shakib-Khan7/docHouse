import React from 'react';
import Banner from '../Banner/Banner';
import Service from '../Service/Service';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <div className='w-5/6 mx-auto'>
            <Service></Service>
            </div>
        </div>
    );
};

export default Home;