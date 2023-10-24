import renderer from "react-test-renderer";
import "./matchMedia.mock";

import HeroSection from "../HeroSection";

it("renders correctly", () => {
    const tree = renderer.create(<HeroSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
