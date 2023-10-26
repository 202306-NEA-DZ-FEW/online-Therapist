import renderer from "react-test-renderer";
import Navbar from "../Navbar";

it("renders correctly", () => {
    // const authInstance = require("firebase/auth").getAuth();
    // Mock methods or properties of authInstance as needed

    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
});
