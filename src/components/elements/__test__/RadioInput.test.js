import renderer from "react-test-renderer";

import RadioInput from "../RadioInput";

it("renders correctly", () => {
    const tree = renderer.create(<RadioInput />).toJSON();
    expect(tree).toMatchSnapshot();
});
