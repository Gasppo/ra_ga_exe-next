import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';


const HeaderBar = () => {

    const { data, status } = useSession({ required: false });

    return (
        <div className='flex justify-between items-center w-full h-14 transition-all duration-200 bg-zinc-800 text-white px-10 py-4' >
            <div className='hidden md:flex md:flex-row'>
                <div className='font-bold'>Contacto:</div>
                <div className='ml-4 text-cyan-600 font-bold'>+123 466 777</div>
            </div>
            <div className='md:hidden'/>
            <div>
                {status !== 'authenticated' && (
                    <div className="flex flex-row" >
                        <div>Login with: </div>
                        <button onClick={() => signIn("github")} className="text-cyan-600 ml-2" >
                            Github
                        </button>
                        <button onClick={() => signIn("google")} className="text-cyan-600 ml-2 " >
                            Google
                        </button>
                    </div>
                )}
                {status === 'authenticated' && (
                    <div className='flex flex-row items-center'>
                        <div className="flex" >
                            <Image src={data.user?.image || ''} width="32" height="32" className='rounded-full' alt=""></Image>
                        </div>
                        <div className='ml-2 mr-5'>
                            <div className='font-bold'>{data.user?.name}</div>
                        </div>
                        <div className='border-l-2 border-opacity-25 border-slate-400'>
                            <button className='ml-5 px-2 py-1 underline' onClick={() => signOut()}>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default HeaderBar
