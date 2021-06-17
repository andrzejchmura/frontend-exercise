import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("should render the converter with correct label", () => {
    render(<App />);

    screen.getByLabelText(/converter/i);
  });

  it("should handle empty input", async () => {
    render(<App />);

    const input = screen.getByLabelText(/converter/i);
    const output = screen.getByTestId("output");

    userEvent.type(input, "");

    expect(output.textContent).toBe("Output: ");
  });

  it("should handle invalid input", async () => {
    render(<App />);

    const input = screen.getByLabelText(/converter/i);
    const output = screen.getByTestId("output");

    userEvent.type(input, "one 2 three");
    expect(output.textContent).toBe(
      "Output: Please provide a number using either digits or words."
    );

    userEvent.clear(input);
    userEvent.type(input, "!@#$%^");
    expect(output.textContent).toBe(
      "Output: Please provide a number using either digits or words."
    );

    userEvent.clear(input);
    userEvent.type(input, "this is not a valid string");
    expect(output.textContent).toBe(
      "Output: Sorry, could not parse the text correctly"
    );

    userEvent.clear(input);
    userEvent.type(input, "99999999999");
    expect(output.textContent).toBe("Output: This number is out of range");
  });

  it("should handle number to words conversion", () => {
    render(<App />);

    const input = screen.getByLabelText(/converter/i);
    const output = screen.getByTestId("output");

    userEvent.type(input, "0");
    expect(output.textContent).toBe("Output: zero");

    userEvent.clear(input);
    userEvent.type(input, "00017");
    expect(output.textContent).toBe("Output: seventeen");

    userEvent.clear(input);
    userEvent.type(input, "123");
    expect(output.textContent).toBe("Output: one hundred and twenty three");

    userEvent.clear(input);
    userEvent.type(input, "432891");
    expect(output.textContent).toBe(
      "Output: four hundred and thirty two thousand eight hundred and ninety one"
    );

    userEvent.clear(input);
    userEvent.type(input, "100000000");
    expect(output.textContent).toBe("Output: one hundred million");

    userEvent.clear(input);
    userEvent.type(input, "999999999");
    expect(output.textContent).toBe(
      "Output: nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine"
    );
  });

  it("should handle words to number conversion", () => {
    render(<App />);

    const input = screen.getByLabelText(/converter/i);
    const output = screen.getByTestId("output");

    userEvent.type(input, "zero");
    expect(output.textContent).toBe("Output: 0");

    userEvent.clear(input);
    userEvent.type(input, "seventeen");
    expect(output.textContent).toBe("Output: 17");

    userEvent.clear(input);
    userEvent.type(input, "one hundred and twenty three");
    expect(output.textContent).toBe("Output: 123");

    userEvent.clear(input);
    userEvent.type(
      input,
      "four hundred and thirty two thousand eight hundred and ninety one"
    );
    expect(output.textContent).toBe("Output: 432891");

    userEvent.clear(input);
    userEvent.type(input, "one hundred million");
    expect(output.textContent).toBe("Output: 100000000");

    userEvent.clear(input);
    userEvent.type(
      input,
      "nine hundred and ninety nine million nine hundred and ninety nine thousand nine hundred and ninety nine"
    );
    expect(output.textContent).toBe("Output: 999999999");
  });
});
