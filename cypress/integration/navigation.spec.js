describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");

    cy.contains("[data-testid='day']", "Tuesday")
      .click()
      .should("have.class", "day-list__item day-list__item--selected");
  });
});

describe("Appointments", () => {
  beforeEach(() => {
    // resets the db and visits the web and checks for "Monday"
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // clicks the add Button
    cy.get("[alt=Add]").first().click();

    // enters the name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // selects interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    // clicks the save button
    cy.contains("Save").click();

    // sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // clicke on the edit button
    cy.get("[alt=Edit]").first().click({ force: true });

    // replaces the name and the interviewer
    cy.get("[data-testid=student-name-input]").clear().type("Freddy Rincon");
    cy.get("[alt='Tori Malcolm']").click();

    // clicks save
    cy.contains("Save").click();

    // shows the new appointment with the updated information
    cy.contains(".appointment__card--show", "Freddy Rincon");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // clicks the delete button for the existing appointment
    cy.get("[alt=Delete]").click({ force: true });

    // clicks the confirm button
    cy.contains("Confirm").click();

    // sees the deleting animation
    cy.contains("Deleting").should("exist");

    // does not see the deleting animation
    cy.contains("Deleting").should("not.exist");

    // sees that the appointment slot is empty
    cy.contains(".appointment__cart--show", "Archie Cohen").should("not.exist");
  });
});
