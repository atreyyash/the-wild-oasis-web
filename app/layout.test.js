import { render, screen } from "@testing-library/react";
import RootLayout from "./layout";

// Mock the child components
jest.mock("./_components/Logo", () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

jest.mock("./_components/Navigation", () => {
  return function MockNavigation() {
    return <div data-testid="navigation">Navigation</div>;
  };
});

jest.mock("./_components/Header", () => {
  return function MockHeader({ children }) {
    return <header data-testid="header">{children}</header>;
  };
});

describe("RootLayout", () => {
  it("renders Header with Logo and Navigation", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const body = container.querySelector("body");
    expect(body).toHaveClass("antialiased", "bg-primary-950", "text-primary-100");
  });
});