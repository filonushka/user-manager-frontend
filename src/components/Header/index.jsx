import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import axios from "../../axios";
import styles from "./Header.module.scss";

export const Header = ({ checked, rerender, isAuth, logout, dispatch }) => {
  const onClickLogout = () => {
    if (window.confirm("Are you sure want to log out?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };
  const onClickRemove = () => {
    if (window.confirm("Are you sure want to delete this user(s)?")) {
      checked.forEach((items) => {
        axios.delete(`/auth/${items}`).then(() => {
          rerender();
        });
      });
    }
  };
  const onClickBlock = async () => {
    if (window.confirm("Are you sure want to block this user(s)?")) {
      await checked.forEach((items) => {
        axios
          .patch(`/auth/block/${items}`)
          .then(() => {
            rerender();
          })
          .then(() => {
            axios.get(`/auth/me`).then((data) => {
              if (data.data.block) {
                rerender();
                dispatch(logout());
                window.localStorage.removeItem("token");
              }
            });
          });
      });
    }
  };
  const onClickUnblock = async () => {
    if (window.confirm("Are you sure want to unblock this user(s)?")) {
      await checked.forEach((items) => {
        axios.patch(`/auth/unblock/${items}`).then(() => {
          rerender();
        });
      });
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        {isAuth ? (
          <div>
            <div className={styles.inner}>
              <div className={styles.logo}>
                <IconButton color="primary" onClick={onClickRemove}>
                  <DeleteForeverRoundedIcon color="error" fontSize="large" />
                </IconButton>
                <IconButton color="primary" onClick={onClickBlock}>
                  <LockIcon fontSize="large" />
                </IconButton>
                <IconButton color="primary" onClick={onClickUnblock}>
                  <LockOpenIcon fontSize="large" />
                </IconButton>
              </div>
              <div className={styles.buttons}></div>
              <Button
                onClick={onClickLogout}
                variant="contained"
                color="error"
                size="large"
              >
                Sign out
              </Button>
            </div>
          </div>
        ) : (
          <div className={styles.inner}>
            <div className={styles.logo}></div>
            <div className={styles.buttons}>
              <Link to="/login">
                <Button variant="outlined" size="large">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="contained" size="large">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};
