import renderer from "react-test-renderer";
import BlogCard from "../BlogCard";

it("renders correctly", () => {
    const tree = renderer.create(<BlogCard url={""} />).toJSON();
    expect(tree).toMatchSnapshot();
});
