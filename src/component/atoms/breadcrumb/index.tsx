import React from "react";
import Typography from "@mui/material/Typography";
import BreadcrumbsMui from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { usePathname } from "next/navigation";
import styles from "./breadcrumb.module.scss";

const Breadcrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  return (
    <div className={styles.breadCrumbWrapper}>
      <p className={styles.breadcrumbTitle}>Dashboard Analytics</p>
      <div role="presentation" onClick={(e) => handleClick(e)}>
        <BreadcrumbsMui
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "#fff",
            },
          }}
        >
          <Link underline="hover" color="whitesmoke" href="/">
            Home
          </Link>
          <Typography color="whitesmoke">Panel</Typography>
        </BreadcrumbsMui>
      </div>
    </div>
  );
};

export default Breadcrumbs;
