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
  const screen = searchParams.get("screen");
  const router = useRouter();

  const handlePathNames = () => {
    const path = paths?.split("/")?.filter((path) => path) as unknown as string;
    console.log(paths, path, screen);
    if (router.pathname === "/") return screen;
    if (screen) return `${path} / ${screen}`;
    return path;
  };

  const pathNames = handlePathNames();

  const handleRouteClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    pathStr: string,
    index?: number,
    isLastPath?: boolean
  ) => {
    event.preventDefault();
    if (pathStr === "/") {
      return router.replace("/", undefined, { shallow: true });
    }
    if (!isLastPath) {
      router.replace("/" + pathStr, undefined, { shallow: true });
    }
  };

  return (
    <div className={styles.breadCrumbWrapper}>
      <div role="presentation">
        <BreadcrumbsMui
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "#fff",
            },
          }}
          aria-label="breadcrumb"
        >
          <Link
            onClick={(e) => handleRouteClick(e, "/")}
            style={{ color: "#fff" }}
            underline="always"
            href="/"
          >
            Home
          </Link>
          {Array.isArray(pathNames) &&
            pathNames.map((pathStr, index) => {
              // const isLastPath = index === pathNames?.length - 1;

              return (
                <Link
                  onClick={(e) => handleRouteClick(e, pathStr, index)}
                  style={{ color: "#fff" }}
                  underline="always"
                  href="/"
                >
                  {pathStr}
                </Link>
              );
            })}
        </BreadcrumbsMui>
      </div>
    </div>
  );
};

export default Breadcrumbs;
