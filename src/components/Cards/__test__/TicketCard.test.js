import renderer from "react-test-renderer";

import TicketCard from "@/components/Cards/TicketCard";

it("renders correctly", () => {
    const tree = renderer.create(<TicketCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
