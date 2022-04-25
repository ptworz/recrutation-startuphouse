import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, List, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";

import { ALPHAVANTAGE_API_KEY } from "../config";
import {
  InputCell,
  StyledButton,
  StyledInput,
  StyledList,
  StyledTable,
} from "../styled";

type Company = {
  symbol: string;
  name: string;
};

function isError(x: any): x is Error {
  return typeof x.message === "string";
}

export const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Company[]>([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [portfolioData, setPortfolioData] = useState<
    Partial<Record<string, Company & { key: string }>>
  >({});

  const handleSearchQueryChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    try {
      setSearchResults([]);
      setIsSearchLoading(true);
      setSearchError(null);

      const { data } = await axios.request<{
        bestMatches: { "1. symbol": string; "2. name": string }[];
      }>({
        url: "https://www.alphavantage.co/query",
        params: {
          function: "SYMBOL_SEARCH",
          keywords: searchQuery,
          apikey: ALPHAVANTAGE_API_KEY,
        },
      });

      const resultsTransformed = data.bestMatches.map((c) => ({
        symbol: c["1. symbol"],
        name: c["2. name"],
      }));

      setSearchResults(resultsTransformed);
    } catch (e) {
      if (isError(e)) {
        setSearchError(e.message);
      }
    } finally {
      setIsSearchLoading(false);
    }
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
    },

    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Company & { key: string }) => (
        <Button
          onClick={() => {
            setPortfolioData({ ...portfolioData, [record.symbol]: undefined });
          }}
        >
          Remove
        </Button>
      ),
    },
  ];

  const ListRenderItem: React.FC<Company> = (item) => {
    const handleListItemClick = () => {
      setPortfolioData({
        ...portfolioData,
        [item.symbol]: {
          key: item.symbol,
          symbol: item.symbol,
          name: item.name,
        },
      });
    };

    return (
      <List.Item
        key={item.symbol}
        actions={[
          <Button icon={<PlusOutlined />} onClick={handleListItemClick} />,
        ]}
      >
        <div>{`${item.symbol} - ${item.name}`}</div>
      </List.Item>
    );
  };

  const TableDataSource = Object.values(portfolioData).filter(
    (i) => i !== undefined
  ) as (Company & { key: string })[];

  return (
    <Row gutter={50}>
      <Col span={12}>
        <label>Company Name</label>
        <Row>
          <InputCell>
            <StyledInput
              disabled={isSearchLoading}
              placeholder="Example: Apple"
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
            <StyledButton onClick={handleSearch} disabled={isSearchLoading}>
              Search
            </StyledButton>
          </InputCell>
        </Row>

        <h4>Search Results</h4>
        <StyledList
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={ListRenderItem}
        />
      </Col>
      <Col span={12}>
        <h4>Your Portfolio</h4>
        <StyledTable columns={columns} dataSource={TableDataSource} />
      </Col>
    </Row>
  );
};
