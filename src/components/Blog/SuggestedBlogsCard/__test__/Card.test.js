import renderer from "react-test-renderer";

import Card from "@/components/Blog/SuggestedBlogsCard/Card";

it("renders correctly", () => {
    const tree = renderer.create(<Card url={""} />).toJSON();
    expect(tree).toMatchSnapshot();
});
