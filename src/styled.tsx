import { Button, Col, Input, List, Table } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  background: transparent;
  border-radius: 20px;
  border: 1px solid;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const StyledInput = styled(Input)`
  border-radius: 20px;
  border: 1px solid;
  flex-grow: 1;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-right: 20px;
`;

export const StyledList: typeof List = styled(List)`
  border: 1px solid;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  background: white;
`;

export const StyledTable: typeof Table = styled(Table)`
  border: 1px solid;
  margin-top: 10px;

  .ant-pagination {
    margin-right: 20px;
  }
`;

export const StyledHeader = styled(Header)`
  background: transparent;
  border-bottom: 2px solid;
  font-size: 2em;
`;

export const InputCell = styled(Col)`
  width: 100%;
  display: flex;
`;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledContent = styled(Content)`
  padding: 25px 50px;
`;
