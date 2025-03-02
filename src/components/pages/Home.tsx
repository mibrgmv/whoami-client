import Button from "../ui/Button.tsx";

const Home = () => {
    return (
        <div className='content'>
            <div className='text-4xl font-bold'>
                welcome to whoami
            </div>
            <div className='p-5 text-3xl font-bold'>
                want to know who are you?
            </div>
            <Button text="find out" />
        </div>
    );
};

export default Home;