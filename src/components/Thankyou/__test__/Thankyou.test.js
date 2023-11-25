import renderer from "react-test-renderer";

import SignupThanks from "../Thankyou";

it("renders correctly", () => {
    const tree = renderer.create(<SignupThanks />).toJSON();
    expect(tree).toMatchSnapshot();
});
