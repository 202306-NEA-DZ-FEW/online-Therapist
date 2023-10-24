import renderer from "react-test-renderer";
import { useRouter } from "next/router";
import Footer from "..";

// Mock the useRouter function
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

it("renders correctly", () => {
    // Configure the mock useRouter function to return a locale
    useRouter.mockImplementation(() => ({
        locale: "en",
    }));

    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
});
