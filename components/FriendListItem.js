import classNames from "classnames";
import Link from "next/link";

export default function FriendListItem(props) {
  const friend = props.friend;
  // map friends!

  return (
    <div>
      {/* mapped friends */}
      <Link href="">
        <a
          className={classNames(
            "bg-neutral-900/70 flex px-2 py-2 flex-row items-center space-x-3",
            "hover:brightness-125 transition-all duration-200"
          )}>
          <img
            src="./images/sample-prof-pic.jpg"
            className={classNames("rounded-full w-8 h-8 shadow-2xl", "")}></img>

          <p>{friend}</p>
        </a>
      </Link>
    </div>
  );
}
