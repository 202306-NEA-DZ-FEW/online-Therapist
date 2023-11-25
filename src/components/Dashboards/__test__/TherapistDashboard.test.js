import renderer from "react-test-renderer";

import TherapistDashboard from "../ThearapistDashboard";

it("renders correctly", () => {
    const tree = renderer.create(<TherapistDashboard url="" />).toJSON();
    expect(tree).toMatchSnapshot();
});
