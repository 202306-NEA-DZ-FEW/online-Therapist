import renderer from "react-test-renderer";

import TicketsSection from "@/components/Home/TicketsSection";

it("renders correctly", () => {
    const tree = renderer.create(<TicketsSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
