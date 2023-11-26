import renderer from "react-test-renderer";

import TherapistsMatches from "../Therapists";

it("renders correctly", () => {
    const tree = renderer.create(<TherapistsMatches url='' />).toJSON();
    expect(tree).toMatchSnapshot();
});
