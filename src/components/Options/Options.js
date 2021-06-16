import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import { useDispatch } from "react-redux";
import { toggleWay } from "../../redux/actions/flightActions";

function Options() {
  const [value, setValue] = React.useState("departure");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(toggleWay(newValue));
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="tabs"
      >
        <Tab
          value="departure"
          label="ВІДПРАВЛЕННЯ"
          icon={<FlightTakeoffIcon />}
        />
        <Tab value="arrival" label="ПРИБУТТЯ" icon={<FlightLandIcon />} />
      </Tabs>
    </Paper>
  );
}

export default Options;
