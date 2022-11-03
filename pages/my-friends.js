import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import FriendList from "../components/FriendList";
import classNames from "classnames";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Feed from "../components/Feed";

export default withPageAuthRequired(MyFriends);

function MyFriends() {
  return (
    <main
      className={classNames(
        "flex flex-row space-y-6",
        "md:my-9 md:space-x-5 md:space-y-0 md:justify-between"
      )}>
      <Feed />
      <FriendList />
    </main>
  );
}
