import renderer from "react-test-renderer";
import Reveal from "../Reveal";

it("renders correctly", () => {
    const tree = renderer.create(<Reveal />).toJSON();
    expect(tree).toMatchSnapshot();
});
