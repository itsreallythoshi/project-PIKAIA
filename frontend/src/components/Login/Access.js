import React, { useState } from "react";

// Add pikaia bots
import log from "./img/log.svg";
import register from "./img/register.svg";

import "./Access.css";

function Access() {
  const [click, setClick] = useState(false);
  function clickOnBlock(e) {
    console.log(e.target.getAttribute("class"));
  }
  
  return (
    <div className="access">
      <div className="access__container">
        <div className="access__forms--container">
          <div className="access__signin--signup">
            <form action="#" className="access__signin--form">
              <h2 className="access__title">Sign in</h2>
              <div className="access__input--field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Username" />
              </div>
              <div className="access__input--field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" />
              </div>
              <input
                type="submit"
                value="Login"
                className="access__btn solid"
              />
              <p className="access__social--text">
                Or Sign in with social platforms
              </p>
              <div className="access__social--media">
                <a href="#" className="access__social--icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="access__social--icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="access__social--icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="access__social--icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
            <form action="#" className="access__signup--form">
              <h2 className="access__title">Sign up</h2>
              <div className="access__input--field">
                <i className="fas fa-user" />
                <input type="text" placeholder="Username" />
              </div>
              <div className="access__input--field">
                <i className="fas fa-envelope" />
                <input type="email" placeholder="Email" />
              </div>
              <div className="access__input--field">
                <i className="fas fa-lock" />
                <input type="password" placeholder="Password" />
              </div>
              <input type="submit" className="access__btn" value="Sign up" />
              <p className="access__social--text">
                Or Sign up with social platforms
              </p>
              <div className="access__social--media">
                <a href="#" className="access__social--icon">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="access__social--icon">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="access__social--icon">
                  <i className="fab fa-google" />
                </a>
                <a href="#" className="access__social--icon">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
            </form>
          </div>
        </div>

        <div className="access__panels--container">
          <div className="access__panel leftPanel">
            <div className="access__content">
              <h3>New here ?</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Debitis, ex ratione. Aliquid!
              </p>
              <button
                onClick={(e) => {
                  setClick(true);
                  console.log(click);
                  clickOnBlock(e);
                }}
                className={
                  click
                    ? "access__btn transparent sign-up-mode"
                    : "access__btn transparent"
                }
              >
                Sign up
              </button>
            </div>
            <img src={log} className="access__image" alt="" />
          </div>
          <div className="access__panel rightPanel">
            <div className="access__content">
              <h3>One of us ?</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p>
              <button
                onClick={(e) => {
                  setClick(true);
                  console.log(click);
                  clickOnBlock(e);
                }}
                className={
                  click
                    ? "access__btn transparent sign-up-mode"
                    : "access__btn transparent"
                }
              >
                Sign in
              </button>
            </div>
            <img src={register} className="access__image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Access;
