import renderer from "react-test-renderer";

import BookingStep5 from "../BookingStep5";

it("renders correctly", () => {
    const tree = renderer.create(<BookingStep5 />).toJSON();
    expect(tree).toMatchSnapshot();
});
