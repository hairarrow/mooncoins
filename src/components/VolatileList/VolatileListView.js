import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import Currency from "../../lib/Currency";

const Title = styled.h2`
  color: #fff;
  font-weight: 700;
  font-size: 5rem;

  @media (max-width: 900px) {
    font-size: 3rem;

    text-align: center;
  }

  @media (max-width: 600px) {
    font-size: 1.8rem;
  }
`;

const Coin = styled(Row)`
  color: #fff;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  .coin {
    margin-bottom: 24px;

    &__data {
      display: flex;
      flex-direction: column;
      align-items: center;

      * {
        display: block;
      }
    }

    &__main-data {
      font-size: 1.4rem;
      font-weight: 800;
      color: ${({ change }) => (change >= 0 ? "#01d8ad" : "#ce18d4")};

      &--plain {
        color: #fff;
      }
    }

    &__sub-data {
      font-weight: 600;
      font-size: 1rem;
      opacity: 0.5;
    }
  }
`;

export default function VolatileListView({ list, isLoading }) {
  return isLoading ? (
    <div>Loading</div>
  ) : (
    <section>
      <Title>Top 10 Volatile Cryptos</Title>
      <Coin gutter={24}>
        <Col xs={24} sm={24} md={6} className="coin__data coin__data--name">
          <span className="coin__main-data coin__main-data--plain">Symbol</span>
          <span className="coin__sub-data">name</span>
        </Col>
        <Col xs={24} sm={24} md={9} className="coin__data coin__data--price">
          <span className="coin__main-data coin__main-data--plain">Price</span>
          <span className="coin__sub-data">Market Cap</span>
        </Col>
        <Col xs={24} sm={24} md={9} className="coin__data coin__data--volume">
          <span className="coin__main-data coin__main-data--plain">
            24h % Change
          </span>
          <span className="coin__sub-data">24h Volume</span>
        </Col>
      </Coin>
      <div>
        {list.map(
          ({
            id,
            symbol,
            name,
            quote: {
              USD: { price, market_cap, percent_change_24h, volume_24h }
            }
          }) => (
            <Coin
              key={id}
              gutter={24}
              className="coin"
              change={percent_change_24h}
            >
              <Col
                xs={24}
                sm={24}
                md={6}
                className="coin__data coin__data--name"
              >
                <span className="coin__main-data">{symbol}</span>
                <span className="coin__sub-data">{name}</span>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={9}
                className="coin__data coin__data--price"
              >
                <span className="coin__main-data">
                  {Currency(price, { maximumFractionDigits: 8 })}
                </span>
                <span className="coin__sub-data">{Currency(market_cap)}</span>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={9}
                className="coin__data coin__data--volume"
              >
                <span className="coin__main-data">
                  {Number(percent_change_24h).toLocaleString()}%
                </span>
                <span className="coin__sub-data">
                  {Number(volume_24h).toLocaleString("en-US", {
                    maximumFractionDigits: 6
                  })}
                </span>
              </Col>
            </Coin>
          )
        )}
      </div>
    </section>
  );
}
