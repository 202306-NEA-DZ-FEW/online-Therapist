import renderer from "react-test-renderer";
import LangDropdown from "../LangDropdown";

it("renders correctly", () => {
    const tree = renderer.create(<LangDropdown />).toJSON();
    expect(tree).toMatchSnapshot();
});