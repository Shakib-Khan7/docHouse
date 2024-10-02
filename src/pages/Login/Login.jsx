import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContex } from "../../AuthProvider/AuthProvider";

const Login = () => {
    const {logIn} = useContext(AuthContex)
    const navigate = useNavigate()

    const handleLogin = event =>{
        event.preventDefault()
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);
        logIn(email,password)
        .then(result=>{
            const loggedUser = result.user
            console.log(result.user);
            navigate('/')
        })
        .catch(err=>{
            console.log(err.message);
        })
    }
    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left md:w-1/2">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                           
                            <div className="form-control mt-6">
                                {/* to do : disbale = true */}
                                <input disabled={false} className='btn btn-primary' type="submit" value="Login" />
                            </div>
                        </form>
                        <p><small>New Here? <Link to='/signup'>Create an account</Link></small></p>
                        <hr />
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;