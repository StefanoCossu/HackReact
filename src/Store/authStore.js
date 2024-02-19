import { create } from "zustand";
import { supabase } from "../supabase/client";

const initialState = {
    session: null,
    profile: null,
    isLoggedIn: false,
    isAdmin: false,
}
const useAuthStore = create((set)=> ({
    ...initialState,
    setLoggedIn: async (session) => {
        const {data} = await supabase
        .from("profiles")
        .select(`
        *,
        votes (*),
        favorites (*)
        `)
        .eq("id", session.user.id)
        .single();
        if(data.banned_until) return;
        set((state) => ({
            ...state,
            session: session,
            profile: data,
            isLoggedIn: true,
            isAdmin: session.user.app_metadata.claims_admin,
        }));
    },
    setProfile: async (profile) => {
        const {data} = await supabase
        .from("profiles")
        .select(`
        *,
        votes (*),
        favorites (*)
        `)
        .eq("id", profile.id)
        .single();
        set((state) =>({
        ...state,
       profile:data
    }))},

    setLoggedOut: () =>
    set(()=> ({
        ...initialState,
    }))
}))

export default useAuthStore;