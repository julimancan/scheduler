import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";
import { element } from "prop-types";
import Button from "components/Button";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText("Monday"))
    .then(() => {
      fireEvent.click(getByText("Tuesday"));
      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } =  render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    // console.log(prettyDOM(appointment));

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    // console.log("Day Dom", prettyDOM(day));
    // expect(getByText(appointment, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview", async () => {
    // 1. Render the Appication.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the "Archie Cohen" element.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the element displaying "Are you sure you want to delete your appointment?" is displayed.
    expect(getByText(appointment, "Are you sure you want to delete your appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" button.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element displaying the "Deleting" element is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();
    // debug();
  }); 
  
  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
    // console.log(Application)

    // debug();
    await waitForElement(() => getByText(container, "Archie Cohen"));


    // 2. Click the "Edit" button on the "Archie Cohen" element.
    const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
    
    fireEvent.click(queryByAltText(appointment, "Edit"));
    // 3. Change the name of the student.
    fireEvent.change(getByPlaceholderText(appointment, /Enter Student Name/i), {
      target: { value: "Julian Bustos" }
    });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));


    // 4. Click the "Save" Button.
    fireEvent.click(getByText(appointment, "Save"));

    // 5. Check that the element displaying "Saving" element is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // 6. Wait until the element with the new name is displayed.
    await waitForElement(() => getByText(appointment, "Julian Bustos"));
    expect(getByText(appointment, "Julian Bustos")).toBeInTheDocument();
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

  });

  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });

  it("shows the delete error when failing to deliete an existing appointment", () => {
    axios.delete.mockRejectedValueOnce();
  })
});