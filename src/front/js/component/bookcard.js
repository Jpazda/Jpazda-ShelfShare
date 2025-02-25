import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { Context } from "../store/appContext";

export const Bookcard = (props) => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const isUserBook = store.activeuser === props.yourbookid;

  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
      <div className="bookcard">
        <img
          className="card-img-top"
          src={props.image}
          alt="Card image cap"
          style={{ width: "150px", height: "200px", objectFit: "contain" }}
        />
        <div className="container">
          <h4 className="card-title mt-1 mb-1"><b>{props.bookname.substring(0, 17)}{props.bookname.length > 17 && "..."}</b></h4>
          <p className="card-text">Author: {props.author}</p>
          <p className="card-text">Year: {props.year}</p>
          <p className="card-text">Category: {props.category}</p>
          <p className="card-text">Available For Exchange: {props.exchange}</p>
          <p className="card-text">Available For Donation: {props.donate}</p>{ }
          {store.activeuser ? (
            <button
              className="btn btn-success"
              onClick={() => {
                navigate(`/showbook/${props.bookid}`);
              }}
            >
              {isUserBook ? "Your Book" : "View"}
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate(`/showbook/${props.bookid}`);
              }}
            >
              View
            </button>
          )}
          {store.activeuser ? (
            store.favoritebookid && store.favoritebookid.includes(props.bookid) ? (
              <button
                className="btn"
                style={{ color: "red" }}
                onClick={() => {
                  actions.deletefavoritebook(props.bookid);
                }}
              >
                <i className="fas fa-bookmark"></i>
              </button>
            ) : (
              <button
                className="btn"
                style={{ color: "black" }}
                onClick={() => {
                  actions.addfavoritebook(store.activeuser, props.bookid);
                }}
              >
                <i className="fas fa-bookmark"></i>
              </button>
            )
          ) : (
            <button className="btn" style={{ display: "none" }}>
              <i className="fas fa-bookmark"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Bookcard.propTypes = {
  bookname: propTypes.string,
  author: propTypes.string,
  year: propTypes.number,
  category: propTypes.string,
  image: propTypes.string,
  location: propTypes.string,
  bookid: propTypes.number,
  yourbookid: propTypes.number,
  exchange: propTypes.string,
  donate: propTypes.string
};
