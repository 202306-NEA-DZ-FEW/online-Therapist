import renderer from "react-test-renderer";

import PatientDashboard from "../PatientDashboard";

it("renders correctly", () => {
    const tree = renderer.create(<PatientDashboard url="" />).toJSON();
    expect(tree).toMatchSnapshot();
});
