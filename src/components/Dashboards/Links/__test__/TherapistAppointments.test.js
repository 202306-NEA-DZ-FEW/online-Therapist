import renderer from "react-test-renderer";
import TherapistAppointments from "../TherapistAppointments";

it("renders correctly", () => {
    const tree = renderer.create(<TherapistAppointments url={""} />).toJSON();
    expect(tree).toMatchSnapshot();
});
