import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ALPHAVANTAGE_API_KEY } from "../config";
import { StyledButton } from "../styled";

type CompanyOverview = {
  Symbol: string;
  Address: string;
  Name: string;
  MarketCapitalization: string; // integer
  Description: string;
};

function isError(x: any): x is Error {
  return typeof x.message === "string";
}

export const CompanyDetails: React.FC = () => {
  const navigate = useNavigate();

  const { symbol } = useParams<"symbol">();

  const [fetchError, setFetchError] = useState<string | null>(null);
  const [fetchResult, setFetchResult] = useState<CompanyOverview | void>();
  const [isFetchLoading, setIsFetchLoading] = useState(false);

  const handleFetch = async (s: string) => {
    try {
      setIsFetchLoading(true);
      setFetchError(null);
      setFetchResult();

      const { data } = await axios.request<CompanyOverview>({
        url: "https://www.alphavantage.co/query",
        params: {
          function: "OVERVIEW",
          symbol: s,
          apikey: ALPHAVANTAGE_API_KEY,
        },
      });

      setFetchResult(data);
    } catch (e) {
      if (isError(e)) {
        setFetchError(e.message);
      }
    } finally {
      setIsFetchLoading(false);
    }
  };

  useEffect(() => {
    symbol && handleFetch(symbol);
  }, [symbol]);

  const companyOverview = fetchResult && (
    <>
      <h1>{fetchResult.Name}</h1>
      <p>
        <b>Address: </b>
        {fetchResult.Address}
      </p>
      <p>
        <b>Market Capitalization: </b>
        {fetchResult.MarketCapitalization}
      </p>
      <p>{fetchResult.Description}</p>
    </>
  );

  const handleGoBackClick = () => {
    navigate("..");
  };

  return (
    <>
      <StyledButton onClick={handleGoBackClick}>Go Back</StyledButton>
      {companyOverview}
    </>
  );
};
