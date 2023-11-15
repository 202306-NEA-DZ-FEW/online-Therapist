import renderer from "react-test-renderer";
import UserDropdown from "../UserDropdown";

it("renders correctly", () => {
    const tree = renderer.create(<UserDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
});