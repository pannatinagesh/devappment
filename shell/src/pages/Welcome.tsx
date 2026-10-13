import { Button } from '@/components/custom/button';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate('/dashboard')
    }

    return (
        <>
            <div className='h-full w-full'>
                <div className='grid grid-cols-2 justify-center items-center'>
                    <div className='col-span-1'>
                        <img src={'/image.jpg'} className='w-full h-[100vh]'/>
                    </div>
                    <div className='col-span-1 flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center justify-center w-3/4'>
                        <h1 className='animated-text text-3xl font-bold text-[#001b71] lg:text-4xl cursor-pointer'>
                            Welcome to Devappment...
                        </h1>
                        <Button size='lg' onClick={handleNavigate}>Home</Button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Welcome
