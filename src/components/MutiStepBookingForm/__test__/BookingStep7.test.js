import renderer from "react-test-renderer";
import BookingStep7 from "../BookingStep7";

it("renders correctly", () => {
    // Mock functions and initial formData
    const mockHandleChangeInput = jest.fn();
    const mockHandlePrevStep = jest.fn();
    const mockHandleSubmitFormData = jest.fn();

    const formData = {
        CounselingType: "simple CounselingType",
        maritalStatus: "simple maritalStatus",
        firstSession: "simple firstSession",
        counselorQualities: "simple counselorQualities",
        issues: "Sample issues",
        specification: "Sample specification",
        // Add other properties required by the component
    };

    const tree = renderer
        .create(
            <BookingStep7
                formData={formData}
                handleChangeInput={mockHandleChangeInput}
                handlePrevStep={mockHandlePrevStep}
                handleSubmitFormData={mockHandleSubmitFormData}
            />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
