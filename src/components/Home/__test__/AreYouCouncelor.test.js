import renderer from "react-test-renderer";

import AreYouCounselor from "@/components/Home/AreYouCouncelor";

it("renders correctly", () => {
    const tree = renderer.create(<AreYouCounselor />).toJSON();
    expect(tree).toMatchSnapshot();
});
