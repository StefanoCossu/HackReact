import { useEffect, useState } from "react";
import { supabase } from "../Supabase/client";
import { useAuth } from "../Contexts/AuthProvider";

export default function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        let { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setProfile(() => data);
      } catch (error) {
        console.log(error);
      }
    };

    if (user) {
      getUserInfo();
    } else {
      setProfile(null);
    }
  }, [user]);

  return profile;
}
