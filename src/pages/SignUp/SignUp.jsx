import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { AuthContex } from '../../AuthProvider/AuthProvider';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SignUp = () => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user, createUser, updateUser, logOut } = useContext(AuthContex)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                updateUser(data.name, data.photoURL)
                    .then(() => {
                        console.log('updated');
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        position: "center",
                                        icon: "success",
                                        title: "Sign up successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })
                        logOut()
                            .then(res => {
                                navigate('/')
                            })

                    })
                    .catch(err => {
                        console.log(err.message);
                    })

            })
            .catch(err => {
                console.log(err.message);
            })
    }




    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />

                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />

                                {errors.photoURL && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/



                                })} type="password" placeholder="password" className="input input-bordered" required />
                                {errors.password && <span className="text-red-500">Password must be 6 character</span>}
                                {errors.password?.type === 'pattern' && <span className="text-red-500">Password must have one upper case,onelower case and one digit character</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign up" />

                            </div>
                        </form>
                        <p className="px-6"><small>Already have an account? <Link to='/login'>Login</Link></small></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;