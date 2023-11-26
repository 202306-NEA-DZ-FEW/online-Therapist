import renderer from "react-test-renderer";

import PatientsList from "../Patients";

it("renders correctly", () => {
    const tree = renderer.create(<PatientsList url='' />).toJSON();
    expect(tree).toMatchSnapshot();
});
