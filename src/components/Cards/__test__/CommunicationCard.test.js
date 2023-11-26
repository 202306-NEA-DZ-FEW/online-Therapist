import renderer from "react-test-renderer";

import CommunicationCard from "../CommunicationCard";

it("renders correctly", () => {
    const tree = renderer.create(<CommunicationCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
