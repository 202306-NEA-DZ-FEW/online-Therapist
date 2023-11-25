import renderer from "react-test-renderer";

import Messages from "../Messages";

it("renders correctly", () => {
    const tree = renderer.create(<Messages url="" />).toJSON();
    expect(tree).toMatchSnapshot();
});
