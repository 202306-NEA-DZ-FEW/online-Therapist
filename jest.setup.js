import "@testing-library/jest-dom/extend-expect";

// Mock the "next/router" module
jest.mock("next/router", () => ({
    useRouter() {
        return {
            pathname: "",
            // ... whatever else you you call on `router`
        };
    },
}));

// Mock the "firebase/auth" api
jest.mock("firebase/auth", () => {
    const authInstance = {
        // Add mock methods and properties as needed
    };

    return {
        getAuth: jest.fn(() => authInstance),
        createUserWithEmailAndPassword: jest.fn(),
        signInWithEmailAndPassword: jest.fn(),
        signInWithPopup: jest.fn(),

        // Add other authentication methods used in your code
    };
});

// Mock the "context/AuthContext" function
jest.mock("@/context/AuthContext", () => {
    return {
        UserAuth: jest.fn(() => {
            return {
                user: {
                    displayName: jest.fn(() => "Mohamed"),
                },
            };
        }),
    };
});

// Mock the "react/i18next" module
jest.mock("react-i18next", () => ({
    useTranslation: () => ({ t: (key) => key }),
}));
