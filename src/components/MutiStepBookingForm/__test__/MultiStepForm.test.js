import renderer from "react-test-renderer";
import MultiStepForm from "../MultiStepForm";

it("renders correctly", () => {
    const tree = renderer.create(<MultiStepForm />).toJSON();
    expect(tree).toMatchSnapshot();
});
