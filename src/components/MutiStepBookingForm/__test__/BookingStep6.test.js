import renderer from "react-test-renderer";

import BookingStep6 from "../BookingStep6";

it("renders correctly", () => {
    // Mock functions
    const mockHandleChangeInput = jest.fn();
    const mockHandlePrevStep = jest.fn();
    const mockHandleNextStep = jest.fn();

    // Mock initial formData
    const formData = {
        specification: "Sample specification", // Initialize as needed
        // Add other properties required by the component
    };

    const tree = renderer
        .create(
            <BookingStep6
                formData={formData}
                handleChangeInput={mockHandleChangeInput}
                handlePrevStep={mockHandlePrevStep}
                handleNextStep={mockHandleNextStep}
            />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
