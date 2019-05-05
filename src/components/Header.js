import React from "react";
import styled from "styled-components";
import User from "./User";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header {
    &__title {
      margin: 0;
      font-weight: 900;
      color: #fff;
      text-transform: uppercase;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;

    .header__title {
      margin-bottom: 24px;
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
    <User />
  </Header>
);
