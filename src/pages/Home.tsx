import button from "../components/ui/Button.module.css";
import {Button} from "../components/ui/Button.tsx";

export const Home = () => {
    return (
        <div className='content'>
            <div className='text-4xl font-bold'>
                Welcome to whoami
            </div>
            <div className='p-5 text-3xl font-bold'>
                Want to know who are you?
            </div>
            <div>
                <Button text="Find out" style={button}/>
            </div>
        </div>
    );
};
