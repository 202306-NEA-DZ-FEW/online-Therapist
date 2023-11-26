import renderer from "react-test-renderer";

import PatientAppointments from "../PatientAppointments";

it("renders correctly", () => {
    const tree = renderer.create(<PatientAppointments url='' />).toJSON();
    expect(tree).toMatchSnapshot();
});
