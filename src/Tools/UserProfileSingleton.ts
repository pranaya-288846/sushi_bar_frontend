// UserProfileSingleton.ts

interface UserProfile {
    id: number;
    name: string;
}

class UserProfileSingleton {
    private static instance: UserProfileSingleton;
    private profile: UserProfile | null = null;

    // Prevent direct construction
    private constructor() {
    }

    // Accessor for the singleton instance
    public static getInstance(): UserProfileSingleton {
        if (!UserProfileSingleton.instance) {
            UserProfileSingleton.instance = new UserProfileSingleton();
        }
        return UserProfileSingleton.instance;
    }

    // Set the user profile
    public setProfile(profile: UserProfile): void {
        this.profile = profile;
    }

    // Get the user profile
    public getProfile(): UserProfile | null {
        return this.profile;
    }

    // Clear the user profile
    public clearProfile(): void {
        this.profile = null;
    }
}

export default UserProfileSingleton;
