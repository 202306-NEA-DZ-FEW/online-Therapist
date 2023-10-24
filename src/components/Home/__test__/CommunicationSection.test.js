import renderer from "react-test-renderer";

import CommunicationSection from "../CommunicationSection";

it("renders correctly", () => {
    const tree = renderer.create(<CommunicationSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
