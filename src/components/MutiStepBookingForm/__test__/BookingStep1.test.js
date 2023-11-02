import renderer from "react-test-renderer";
import BookingStep1 from "../BookingStep1";

it("renders correctly", () => {
    const tree = renderer.create(<BookingStep1 />).toJSON();
    expect(tree).toMatchSnapshot();
});
