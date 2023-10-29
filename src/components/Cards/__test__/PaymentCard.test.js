import renderer from "react-test-renderer";

import PaymentCard from "../PaymentCard";

it("renders correctly", () => {
    const tree = renderer.create(<PaymentCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
