import { Button } from '@/components/custom/button';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/dashboard')
    }

    return (
        <>
            <div className='h-full flex flex-col items-center justify-center z-[2000]'>
                <div className='flex h-[60%] w-[60%] p-10 text-white lg:flex justify-center items-center'>
                    <img
                        src={'https://devappment.in/wp-content/uploads/2024/09/Devappment_Logo.png'}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='animated-text text-3xl font-bold text-[#001b71] lg:text-4xl cursor-pointer'>
                        Welcome to Devappment...
                    </h1>
                    <Button size='lg' onClick={handleNavigate}>Home</Button>
                </div>
            </div>
        </>
    )
}
export default Welcome
