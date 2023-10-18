import renderer from "react-test-renderer";

import AppointmentSection from "../AppointmentSection";

it("renders correctly", () => {
    const tree = renderer.create(<AppointmentSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
