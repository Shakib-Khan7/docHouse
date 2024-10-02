import Services from "../../../Components/Services";
import useServices from "../../../hooks/useServices";


const Service = () => {
    const [services] = useServices()
    
    

    
    return (
        <div>
            <div className='mt-10 text-center mb-10 space-y-8'>
                <p className="text-2xl font-sans font-bold tracking-widest">Available Services</p>
                <h2 className="text-orange-500">Please Select a service</h2>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                {
                    services.map(service=>
                        <Services key={service._id}
                        service={service}
                        ></Services>
                    )
                }

            </div>
        </div>
    );
};

export default Service;