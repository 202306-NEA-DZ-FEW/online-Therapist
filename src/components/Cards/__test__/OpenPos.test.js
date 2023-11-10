import renderer from "react-test-renderer";
import OpenPos from "../OpenPos";

it("renders correctly", () => {
    const tree = renderer.create(<OpenPos />).toJSON();
    expect(tree).toMatchSnapshot();
});
