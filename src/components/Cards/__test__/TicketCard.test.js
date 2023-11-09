import renderer from "react-test-renderer";

import TicketCard from "@/components/Cards/TicketCard";

it("renders correctly", () => {
    // Define a mock 'price' object to pass as a prop
    const mockPrice = {
        nickname: "Example Ticket",
        unit_amount: 1000, 
    };

    const tree = renderer.create(<TicketCard price={mockPrice} />).toJSON();
    expect(tree).toMatchSnapshot();
});
