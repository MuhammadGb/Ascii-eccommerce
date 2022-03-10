import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  cursor: pointer;
  margin: auto;
  flex-direction: column;
  width: 15rem;
  height: 15rem;
  border: 1px solid grey;
  border-radius: 9px;
  color: lightgray;
  background-color: #034b03;
  .asciiWrapper {
    color: wheat;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-color: #3cb364;
    width: 100%;
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ascii {
    font-size: 2.3rem;
    font-weight: 700;
    margin: auto;
  }
  .subtitleWrapper {
    margin-top: 1rem;
    margin: 0.5rem;
    font-size: 0.8rem;
  }
  .subtitle {
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  .label {
    margin-right: 0.7rem;
    font-weight: 700;
  }
`;

const AsciiItem = ({ ascii }) => {
  const getNotificationTime = (utc_date) => {
    const d = Date.now();
    const d_notification = Date.parse(utc_date);
    const diff = d - d_notification;
    const years = Math.floor(diff / (12 * 30 * 24 * 60 * 60 * 1000));
    const months = Math.floor(diff / (30 * 24 * 60 * 60 * 1000));
    const days = Math.floor(diff / (24 * 60 * 60 * 1000));
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const mins = Math.floor(diff / (60 * 1000));
    const secs = Math.floor(diff / 1000);

    if (years >= 1) {
      return `${years} ${years > 1 ? "YEARS" : "YEAR"} AGO`;
    } else if (months >= 1) {
      return `${months} ${months > 1 ? "MONTHS" : "MONTH"} AGO`;
    } else if (days >= 1) {
      return `${days} ${days > 1 ? "DAYS" : "DAY"} AGO`;
    } else if (hours >= 1) {
      return `${hours} ${hours > 1 ? "HOURS" : "HOUR"} AGO`;
    } else if (mins >= 1) {
      return `${mins} ${mins > 1 ? "MINS" : "MIN"} AGO`;
    } else if (secs >= 1) {
      return `${secs} ${secs > 1 ? "SECONDS" : "SECOND"} AGO`;
    }

    return "--";
  };

  return (
    <Wrapper>
      <div className="asciiWrapper">
        <span className="ascii">{ascii.face}</span>
      </div>
      <div className="subtitleWrapper flexColumn">
        <span className="flexRow subtitle">
          <span className="label">size: </span>
          <span>{ascii.size}</span>
        </span>
        <span className="flexRow subtitle">
          <span className="label">price: </span>
          <span>${ascii.price / 100}</span>
        </span>
        <span className="flexRow subtitle">
          <span className="label">date: </span>
          <span>
            {getNotificationTime(ascii.date).substring(0, 2) > 6 &&
            /DAYS/.test(getNotificationTime(ascii.date))
              ? new Date(ascii.date.substring(0, 15))
                  .toDateString()
                  .substring(4, 15)
              : getNotificationTime(ascii.date)}
            {/* {new Date(ascii.date.substring(0, 15))
              .toDateString()
              .substring(4, 15)} */}
          </span>
        </span>
      </div>
    </Wrapper>
  );
};

export default AsciiItem;
