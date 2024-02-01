import { Profiles } from "../constants";

export class ProfileUtils {
    static isAdmin(role: string): boolean {
        return role === Profiles.ADMIN
    }

    static isCompany(role: string): boolean {
        return role === Profiles.COMPANY
    }

    static isPref(role: string): boolean {
        return role === Profiles.PREF
    }
}