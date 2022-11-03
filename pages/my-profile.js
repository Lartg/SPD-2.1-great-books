import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import classNames from "classnames";
import ShelfListItem from "../components/ShelfListItem";
import ProfileTabs from "../components/ProfileTabs";
import TinyBook from "../components/TinyBook";
import { useState, useEffect } from "react";

export default withPageAuthRequired(MyProfile);

function MyProfile() {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  // user object from Auth0
  const { user, isLoading } = useUser();

  useEffect(() => {
    async function runGet() {
      console.log("THIS USER 1", user);
      const getThisUser = await fetch("/api/users/", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          userId: user.sub,
        }),
      }).then((response) => response.json());

      console.log("THIS USER", getThisUser);
      //Now that we have this users ID, we can get follower following

      const followersResponse = await fetch("/api/users/" + getThisUser.id + "/follows").then(
        (response) => response.json()
      );
      setFollowers(followersResponse);

      const followingResponse = await fetch("/api/users/" + getThisUser.id + "/following").then(
        (response) => response.json()
      );
      setFollowing(followingResponse);
    }
    if (user.sub) {
      runGet();
    }
  }, [user]);

  return (
    <main className={classNames("flex flex-col space-y-6", "md:my-9")}>
      <div className={classNames("box md:p-7")}>
        {/* profile row */}
        <div
          className={classNames(
            "flex flex-row items-center w-full space-x-3  px-3 mb-5",
            "md:space-x-6 md:px-0"
          )}>
          {/* profile picture */}
          {/* TROUBLE LOADING CONSISTENTLY */}
          <img src={user.picture} className={classNames("rounded-full w-24 shadow-2xl", "")}></img>

          {/* profile info */}
          <div className={classNames("flex flex-col space-y-1", "md:space-y-2")}>
            {/* name */}
            <h1 className={classNames("text-xl", "md:text-3xl")}>{user.name}</h1>

            {/* profile numbers */}
            <div className={classNames("flex flex-row space-x-4", "")}>
              {/* follower count */}
              <div className={classNames("flex flex-row items-center text-white/70", "")}>
                <h3 className={classNames("text-sm", "")}>{followers.length} Followers</h3>{" "}
              </div>

              {/* following count */}
              <div className={classNames("flex flex-col items-center text-white/70", "")}>
                <h3 className={classNames("text-sm", "")}>{following.length} Following</h3>{" "}
              </div>
            </div>
          </div>
        </div>
        <ProfileTabs user={user} followers={followers} following={following} />
      </div>
    </main>
  );
}
