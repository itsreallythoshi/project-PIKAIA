import { Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { SettingsContext } from "../context/SettingsContext";

const SetTimer = () => {
  const [newTimer, setNewTimer] = useState({
    work: 0,
    short: 0,
    long: 0,
    active: "work",
  });

  const { updateExecute } = useContext(SettingsContext);

  const handleChange = (input) => {
    const { name, value } = input.target;

    setNewTimer({
      ...newTimer,
      work: parseInt(value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExecute(newTimer);
  };
  return (
    <div className="setTimer">
      <form noValidate onSubmit={handleSubmit}>
        <div className="setTimer__stroke">
          <div className="setTimer__input">
            <input
              className="input"
              type="number"
              name="work"
              onChange={handleChange}
              value={newTimer.work}
            />
          </div>
        </div>
        <Button
          style={{
            backgroundColor: "white",
            padding: "5px 12px",
          }}
          type="submit"
        >
          Set Timer
        </Button>
      </form>
    </div>
  );
};

export default SetTimer;
