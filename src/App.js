import React, { useEffect, useState } from "react";
import AsciiList from "./components/AsciiList";
import styled from "styled-components";

const Wrapper = styled.div`
  @media screen and (max-width: 500px) {
    .header {
      width: 96% !important;
      text-align: center;
    }
    img {
      width: 90% !important;
    }
  }
`;

function App() {
  const [uniqueNum, setUniqueNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  let uniqueArr = [];

  const generateNum = () => {
    const random = Math.floor(Math.random() * 1000);

    if (!uniqueArr.includes(random)) {
      uniqueArr.push(random);
      setUniqueNum(random);
      return random;
    } else {
      if (uniqueArr.length < 1000) {
        return generateNum();
      } else {
        uniqueArr = new Array();
        return generateNum();
      }
    }
  };

  useEffect(() => {
    generateNum();
  }, [pageNum]);

  return (
    <Wrapper>
      <div style={{ backgroundColor: "olivedrab" }}>
        <h1 style={{ marginLeft: "0.5rem", color: "white" }}>Products Grid</h1>
        <p
          className="header"
          style={{
            width: "40%",
            fontSize: "smaller",
            marginLeft: "0.5rem",
            color: "white",
            "@media only screen and (maxWidth: 500px)": {
              width: "100%",
            },
          }}
        >
          Here you're sure to find a bargain on some of the finest ascii
          available to purchase. Be sure to peruse our selection of ascii faces
          in an exciting range of sizes and prices.
        </p>
        <div
          style={{
            display: "flex",
            padding: "1rem",
            paddingTop: "0rem",
            margin: "0rem",
            marginBottom: "1rem",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "darkolivegreen",
          }}
        >
          <h3 style={{ marginRight: "2rem", color: "white" }}>
            But first, a word from our sponsors:
          </h3>
          <img
            style={{ width: "40%", height: "15rem", margin: "auto" }}
            className="ad"
            src={`/ads/?r=${uniqueNum}`}
          />
        </div>
        <AsciiList
          generateNum={generateNum}
          uniqueNum={uniqueNum}
          pageNum={pageNum}
          setPageNum={setPageNum}
        />
        {/* <Router>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/sign_up" />} />
          // No match 
           <Route component={PageNotFound} /> 
        </Switch>
      </Router> */}
      </div>
    </Wrapper>
  );
}

export default App;
