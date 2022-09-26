
const SignInButtons = (props: { onClose: () => void }) => (
    <div className="flex flex-col items-center" >
        <div className='flex justify-between'>
            <div className='mt-10  text-gray-700 p-2 mx-2 rounded-lg hover:animate-pulse'>
                <button onClick={props.onClose} type='button'>Cancelar</button>
            </div>
            <div className='mt-10 bg-gray-700 text-white p-2 mx-2 rounded-lg hover:animate-pulse'>
                <button type='submit'>{'Iniciar Sesion'}</button>
            </div>
        </div>
    </div>
)

export default SignInButtons