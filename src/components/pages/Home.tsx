import Button from "../ui/Button.tsx";

const Home = () => {
    return (
        <div className='content'>
            <div className='text-4xl font-bold'>
                Welcome to whoami
            </div>
            <div className='p-5 text-3xl font-bold'>
                Want to know who are you?
            </div>
            <Button text="Find out" />
        </div>
    );
};

export default Home;