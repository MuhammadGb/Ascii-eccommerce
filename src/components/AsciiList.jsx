import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AsciiItem from "./AsciiItem";
import Loader from "../global/Loader";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  .select {
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: center;
    right: 3rem;
    top: 5rem;
    .label {
      font-size: 1.2rem;
      margin-right: 0.6rem;
      font-weight: 700;
      color: linen;
    }
  }
  .selectdiv {
    position: relative;
    float: left;
  }
  .selectdiv:after {
    content: ">";
    font: 26px "Consolas", monospace;
    color: #333;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    right: 12px;
    top: 6px;
    padding: 0 0 2px;
    border-bottom: 2px solid #999;
    /*left line */

    position: absolute;
    pointer-events: none;
  }

  .selectdiv select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /* Add some styling */

    width: 8rem;
    height: 35px;
    float: right;
    margin: 5px 0px;
    padding: 0px 24px;
    font-size: 16px;
    line-height: 1.75;
    color: #333;
    background-color: #ffffff;
    background-image: none;
    border: 1px solid #cccccc;
    -ms-word-break: normal;
    word-break: normal;
  }
  .selectField {
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
  }
  option {
    padding: 1rem 0rem;
    margin: 1rem 0rem;
    font-size: 1rem;
  }
  .products {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
  }
  .adImg {
    grid-column: 1 / span 4;
    margin: auto;
    width: 97%;
  }
  h1 {
    color: white;
    text-align: center;
    padding-top: 1rem;
  }
  @media screen and (max-width: 1000px) {
    .products {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 2rem;
    }
    .adImg {
      grid-column: 1 / span 3;
    }
  }
  @media screen and (max-width: 768px) {
    .products {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
    .adImg {
      grid-column: 1 / span 2;
    }
  }
  @media screen and (max-width: 500px) {
    .products {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
    }
    .adImg {
      grid-column: 1 / span 1;
      width: 90%;
      height: 70%;
      padding-top: 0rem;
    }
    .select {
      position: relative;
      left: 1rem;
      top: -0.5rem;
    }
  }
`;

const AsciiList = ({ uniqueNum, generateNum, pageNum, setPageNum }) => {
  const [sort, setSort] = useState("");
  const [limit, setlimit] = useState(20);
  const [asciis, setAsciis] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [endFetch, setEndFetch] = useState(false);

  const handleSelect = (e) => {
    setSort(e.target.value);
  };

  function handleScroll() {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      asciis.length === totalItems
    ) {
      setLoading(false);
      window.removeEventListener("scroll", handleScroll);
      setEndFetch(true);
      return false;
    } else if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      asciis.length !== totalItems
      // window.innerHeight + document.documentElement.scrollTop !==
      // document.documentElement.offsetHeight
    ) {
      setLoading(true);
    }
  }

  useEffect(() => {
    if (asciis.length !== totalItems) {
      window.addEventListener("scroll", handleScroll);
    } else {
      return false;
    }
    //return () => window.removeEventListener("scroll", handleScroll);
  }, [asciis]);

  async function fetchMoreAsciis() {
    if (endFetch == true) return;
    const res = await (
      await fetch(
        `/api/products?_page=${pageNum}&_limit=${limit}?_sort=${sort}`,
      )
    ).json();
    setAsciis((prevState) => [...prevState, ...res]);
    setPageNum(pageNum + 1);
    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      fetchMoreAsciis();
    } else {
      //generateNum();
      return false;
    }
  }, [loading]);

  const fetchAsciis = async () => {
    //generateNum();
    if (sort !== "") {
      setLoading(true);
    } else {
      setLoading(false);
    }
    const res = await fetch(
      `/api/products?_page=${pageNum}&_limit=${limit}?_sort=${sort}`,
    );
    setTotalItems(res.headers.get("x-total-count"));
    const data = await res.json();
    setAsciis(data);
    setPageNum(pageNum + 1);
    return data;
  };

  useEffect(() => {
    fetchAsciis();
  }, [sort]);

  return (
    <Wrapper>
      <div className="select">
        <span className="label">Sort by :</span>
        <span className="selectdiv">
          <select
            className="selectField"
            onChange={(e) => {
              handleSelect(e);
            }}
            defaultValue="id"
            name="size"
          >
            <option value="id">ID</option>
            <option value="price">Price</option>
            <option value="size">Size</option>
          </select>
        </span>
      </div>
      <div className="products">
        {asciis.map((ascii, index) => {
          return ++index % (20 + 1) !== 0 ? (
            <AsciiItem key={index} ascii={ascii} />
          ) : (
            <div
              key={index}
              style={{
                display: "flex",
                padding: "1rem",
                flexDirection: "column",
                backgroundColor: "darkolivegreen",
              }}
              className="adImg"
            >
              <h1 style={{ alignSelf: "self-start", color: "white" }}>
                A word from our sponsors:
              </h1>
              <img
                style={{ width: "40%", height: "15rem", margin: "auto" }}
                className="ad"
                src={`/ads/?r=${index}`}
              />
            </div>
          );
        })}
      </div>
      {loading ? <h1>~ End of catalogue ~</h1> : ""}
      {!loading ? <Loader /> : ""}
    </Wrapper>
  );
};

export default AsciiList;
