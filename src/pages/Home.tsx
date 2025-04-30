import { Button } from "../components/ui/Button.tsx";
import { Container } from "../components/Container.tsx";

export const HomePage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          welcome to Whoami
        </h1>

        {/*<p className="text-2xl font-medium text-gray-700 mb-10">*/}
        {/*    the quizzes website*/}
        {/*</p>*/}

        <Button
          text="Browse Quizzes"
          to="/quizzes"
          variant="primary"
          className="text-lg px-6 py-3"
        />
      </div>
    </Container>
  );
};
