import renderer from "react-test-renderer";
import "./matchMedia.mock";

import HomePageWrapper from "@/components/Home/HomePageWrapper";

it("renders correctly", () => {
    const tree = renderer.create(<HomePageWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
});
