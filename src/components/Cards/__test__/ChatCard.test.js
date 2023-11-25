import renderer from "react-test-renderer";
import ChatCard from "../ChatCard";

jest.mock("@/context/AuthContext", () => ({
    __esModule: true,
    useAuth: jest.fn(() => ({ user: { uid: "mockUserId" } })),
}));

jest.mock("next/image", () => ({ src, alt }) => <img src={src} alt={alt} />);

jest.mock("@/util/firebase", () => ({
    db: {
        collection: jest.fn(),
        getDocs: jest.fn(),
        query: jest.fn(),
        where: jest.fn(),
    },
}));

describe("ChatCard component", () => {
    it("renders correctly", async () => {
        const tree = renderer.create(<ChatCard />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
