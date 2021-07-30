import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";
// import { mockApiResponse } from "./mocks";
// https://kentcdodds.com/blog/stop-mocking-fetch
// jest.mock("./API", () => {
//   return mockApiResponse;
// });

test("renders input", () => {
  render(<App />);
  const task = screen.getByLabelText(/Task description/i);
  expect(task).toBeInTheDocument();
});

test("renders list", () => {
  render(<App />);
  const listItem = screen.getByText(/task item 1/i);
  expect(listItem).toBeInTheDocument();
});

test("renders save new task button", () => {
  render(<App />);
  const button = screen.getByText(/add new/i);
  expect(button).toBeInTheDocument();
});

test("save event triggered on button click", () => {
  render(<App />);
  const task = screen.getByLabelText(/Task description/i);
  userEvent.type(task, "a new task");
  const button = screen.getByText(/add new/i);
  userEvent.click(button);
  expect(screen.getByLabelText(/Task description/i)).toHaveValue("");
  const listItem = screen.getByText(/a new task/i);
  expect(listItem).toBeInTheDocument();
});

test("save event triggered on Enter key pressed on input", () => {
  render(<App />);
  const task = screen.getByLabelText(/Task description/i);
  userEvent.type(task, "a new task");
  userEvent.type(task, "{enter}");
  expect(screen.getByLabelText(/Task description/i)).toHaveValue("");
  const listItem = screen.getByText(/a new task/i);
  expect(listItem).toBeInTheDocument();
});
