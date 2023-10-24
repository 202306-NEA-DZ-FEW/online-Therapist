import renderer from "react-test-renderer";
import { useRouter } from "next/router";
import Navbar from "../Navbar";

// Mock the useRouter function
jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

it("renders correctly", () => {
    // Configure the mock useRouter function to return a locale
    useRouter.mockImplementation(() => ({
        locale: "en",
    }));

    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
});
