import Button from "@material-ui/core/Button";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useCopyToClipboard } from "react-use";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import React, { useCallback, useState } from "react";
import { ClickAwayListener } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

export const CopyToClipboard: React.FC<{ text: string }> = React.memo(
  ({ text }) => {
    const classes = useStyles();
    const [, copyToClipboard] = useCopyToClipboard();
    const [statusCopy, setStatusCopy] = useState("copy");

    const onClickCopy = useCallback(() => {
      copyToClipboard(text);
      setStatusCopy("copied");
    }, [copyToClipboard, text]);

    const onClickAway = useCallback(() => {
      setStatusCopy("copy");
    }, [setStatusCopy]);

    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <Tooltip title={statusCopy} placement="top-start" arrow>
          <div>
            <Button className={classes.root} onClick={onClickCopy}>
              <FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
              {text}
            </Button>
          </div>
        </Tooltip>
      </ClickAwayListener>
    );
  }
);
