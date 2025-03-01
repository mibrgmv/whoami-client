const Home = () => {
    return (
        <div className='h-150 w-full flex flex-col items-center justify-center text-black'>
            <div className='text-center'>
                <div className='p-2 text-4xl font-bold'>
                    Home Page
                </div>
                <div className='p-2 text-3xl font-bold'>
                    Very Cool
                </div>
            </div>
            <div className='mt-4 py-3 px-6 rounded-full text-black border border-black hover:bg-black hover:text-white'>
                Button
            </div>
        </div>
    );
};

export default Home;