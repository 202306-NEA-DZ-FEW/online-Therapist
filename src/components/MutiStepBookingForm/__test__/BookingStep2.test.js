import renderer from "react-test-renderer";

import BookingStep2 from "../BookingStep2";

it("renders correctly", () => {
    const tree = renderer.create(<BookingStep2 />).toJSON();
    expect(tree).toMatchSnapshot();
});
