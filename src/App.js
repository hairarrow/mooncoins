import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import VolatileList from "./components/VolatileList";

const Container = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  padding: 24px;
  background: linear-gradient(to bottom, #09345b, #081644);
`;

function App() {
  return (
    <Container>
      <Header />
      <VolatileList />
    </Container>
  );
}

export default App;
