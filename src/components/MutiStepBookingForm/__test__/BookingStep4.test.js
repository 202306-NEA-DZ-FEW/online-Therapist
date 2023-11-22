import renderer from "react-test-renderer";
import BookingStep4 from "../BookingStep4";

it("renders correctly", () => {
    const tree = renderer.create(<BookingStep4 />).toJSON();
    expect(tree).toMatchSnapshot();
});
