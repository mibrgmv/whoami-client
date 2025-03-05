import {Button} from "../components/ui/Button.tsx";
import {Container} from "../components/Container.tsx";

export const Home = () => {
    return (
        <Container>
            <div className='text-4xl font-bold'>
                Welcome to whoami
            </div>
            <div className='p-5 text-3xl font-bold'>
                Want to know who are you?
            </div>
            <div>
                <Button text="Find out" to="/quizzes"/>
            </div>
        </Container>
    );
};