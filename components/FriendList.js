import classNames from "classnames";
import FriendListItem from "./FriendListItem";

export default function FriendList() {
  return (
    <div className={classNames("box w-full", "md:max-w-[300px]")}>
      <h1
        className={classNames(
          "text-center px-2 pb-2 bg-neutral-900 border-b-2 divider",
          "md:text-left"
        )}>
        Friends
      </h1>

      {/* needs to be scrollable!! */}
      <div className={classNames("py-2 px-3", "md:mt-3 md:p-0")}>
        <FriendListItem friend="Lissa" />
        <FriendListItem friend="Lissa" />
        <FriendListItem friend="Lissa" />
        <FriendListItem friend="Lissa" />
        <FriendListItem friend="Lissa" />
        <FriendListItem friend="Lissa" />
        <FriendListItem friend="Lissa" />
      </div>
    </div>
  );
}
