import renderer from "react-test-renderer";
import SignupThanks from "../SignupThanks";

it("renders correctly", () => {
    const tree = renderer.create(<SignupThanks />).toJSON();
    expect(tree).toMatchSnapshot();
});
