import { Container } from "../components/Container.tsx";
import React from "react";

interface Props {
  name: string;
}

export const Success: React.FC<Props> = ({ name }) => {
  return (
    <Container>
      <div>{name} successful</div>
    </Container>
  );
};
