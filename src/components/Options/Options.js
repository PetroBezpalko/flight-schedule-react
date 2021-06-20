import React from "react";
import { Paper, Tabs, Tab } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { toggleWay } from "../../redux/actions/flightActions";
import { StylesProvider } from "@material-ui/core/styles";
import "./options.css";

function Options() {
  const [value, setValue] = React.useState("departure");
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(toggleWay(newValue));
  };

  return (
    <StylesProvider injectFirst>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="tabs"
        >
          <Tab value="departure" label="&#8599; ВІДПРАВЛЕННЯ" />
          <Tab value="arrival" label="&#8600; ПРИБУТТЯ" />
        </Tabs>
      </Paper>
    </StylesProvider>
  );
}

export default Options;
