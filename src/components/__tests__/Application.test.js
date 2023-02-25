import React from "react";

import { render, cleanup, getByText } from "@testing-library/react";

import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

it("renders without crashing", () => {
  const {getByText} = render(<Application />);
});
