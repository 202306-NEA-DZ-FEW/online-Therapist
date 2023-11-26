import renderer from "react-test-renderer";

import CheckboxInput from "../CheckboxInput";

it("renders correctly", () => {
    const tree = renderer.create(<CheckboxInput />).toJSON();
    expect(tree).toMatchSnapshot();
});
