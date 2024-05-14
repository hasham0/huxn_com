import React, { useEffect, useState } from "react";
import { useUserProfileQuery } from "../../redux/api/userApi";
import { userTemTS } from "../../lib/zod";

type Props = {};

export default function Profile({}: Props) {
  const { currentData } = useUserProfileQuery({});
  const [dd, setDD] = useState<userTemTS>({
    _id: "",
    email: "",
    username: "",
    isAdmin: false,
  });
  useEffect(() => {
    if (!currentData) return;
    setDD(currentData);
  }, [currentData]);

  return <div>Profile</div>;
}
