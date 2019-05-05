import React from "react";
import styled from "styled-components";

const Header = styled.header`
  .header {
    &__title {
      font-weight: 900;
      color: #fff;
      text-transform: uppercase;
    }
  }
`;

export default () => (
  <Header className="header">
    <h1 className="header__title">
      <span role="img" aria-label="Rocket Ship">
        🚀
      </span>{" "}
      mooncoins
    </h1>
  </Header>
);
