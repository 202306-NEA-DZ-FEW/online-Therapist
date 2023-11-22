import renderer from "react-test-renderer";
import BookingStepFinal from "../BookingStepFinal";

it("renders correctly", () => {
    const tree = renderer.create(<BookingStepFinal />).toJSON();
    expect(tree).toMatchSnapshot();
});
