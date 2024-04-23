import React from "react";
import Typography from "@mui/material/Typography";
import BreadcrumbsMui from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname, useSearchParams } from "next/navigation";
import styles from "./breadcrumb.module.scss";
import { useRouter } from "next/router";

const Breadcrumbs = () => {
  const paths = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const screen = searchParams.get("screen");

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    router.replace("/", undefined, { shallow: true });
  };

  const handlePathNames = () => {
    const path = paths.split("/").filter((path) => path) as unknown as string;
    if (router.pathname === "/") {
      return screen;
    }
    return path;
  };

  const pathNames = handlePathNames();

  return (
    <div className={styles.breadCrumbWrapper}>
      <p className={styles.breadcrumbTitle}>Dashboard Analytics</p>
      <div role="presentation">
        <BreadcrumbsMui
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "#fff",
            },
          }}
        >
          <Link
            onClick={(e) => handleClick(e)}
            underline="hover"
            color="whitesmoke"
            href="/"
          >
            Home
          </Link>
          <Typography color="whitesmoke">{pathNames}</Typography>
        </BreadcrumbsMui>
      </div>
    </div>
  );
};

export default Breadcrumbs;
