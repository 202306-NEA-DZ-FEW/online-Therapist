import renderer from "react-test-renderer";

import WaitingAppointments from "../WaitingAppointments";

it("renders correctly", () => {
    const tree = renderer.create(<WaitingAppointments url='' />).toJSON();
    expect(tree).toMatchSnapshot();
});
