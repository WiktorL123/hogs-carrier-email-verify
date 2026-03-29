import { render } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renderuje się bez błędu", () => {
    expect(() => render(<Page />)).not.toThrow();
  });
});
