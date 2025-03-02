import Button from "../ui/Button.tsx";

const Home = () => {
    return (
        <div className='content'>
            <div className='p-2 text-4xl font-bold'>
                Welcome to the .testapp!
            </div>
            <div className='p-2 text-3xl font-bold'>
                Some question?
            </div>
            <Button text="Find out" />
        </div>
    );
};

export default Home;