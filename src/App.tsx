import "./App.css";

import { Route, Routes } from "react-router-dom";

import { CompanyDetails } from "./routes/CompanyDetails";
import { Dashboard } from "./routes/Dashboard";
import { StyledContent, StyledHeader, StyledLayout } from "./styled";

const App = () => (
  <StyledLayout>
    <StyledHeader>SDH Frontend Homework</StyledHeader>
    <StyledContent>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="company-details/:symbol" element={<CompanyDetails />} />
      </Routes>
    </StyledContent>
  </StyledLayout>
);

export default App;
