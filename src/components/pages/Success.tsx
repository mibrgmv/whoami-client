import React from "react";
import { Container } from "../core";

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
