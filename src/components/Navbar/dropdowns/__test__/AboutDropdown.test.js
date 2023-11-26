import renderer from "react-test-renderer";

import AboutDropdown from "../AboutDropdown";

it("renders correctly", () => {
    const tree = renderer.create(<AboutDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
});
