import renderer from "react-test-renderer";

import BookingStep3 from "../BookingStep3";

it("renders correctly", () => {
    const tree = renderer.create(<BookingStep3 />).toJSON();
    expect(tree).toMatchSnapshot();
});
