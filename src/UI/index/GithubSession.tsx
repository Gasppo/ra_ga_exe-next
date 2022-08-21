import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';


const GithubSession = () => {

    const { data, status } = useSession({ required: false });

    console.log(status)

    if (status === "loading") return <div>Loading...</div>

    if (!data) return (
        <div className="flex flex-row" >
            <div>Sign in with: </div>
            <button onClick={() => signIn("github")} className="text-cyan-600 ml-2" >
                Github
            </button>
        </div>

    )

    return (
        <div className='bg-slate-700 rounded-lg px-10 py-6'>
            <b className='text-white text-2xl'>{data.user?.name}</b>
            <p className='text-slate-400 text-sm'>{data.user?.email}</p>
            <div className="mt-4 flex flex-row" >
                <Image src={data.user?.image || ''} width="32" height="32" className='rounded-full' alt=""></Image>
                <button className='ml-10 bg-gray-300 px-2 py-1 rounded-xl hover:bg-purple-300 transition-all duration-500' onClick={() => signOut()}>
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default GithubSession
