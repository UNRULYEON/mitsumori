import React from "react"
import { Dialog as MuiDialog } from "@material-ui/core"

type DialogProps = {
  open: boolean
  onClose: () => void
  content: () => JSX.Element
  actions?: ({ onClose }: DialogPropsActionsType) => JSX.Element
}

type DialogPropsActionsType = {
  onClose: () => void
}

const Dialog = (props: DialogProps) => {
  const { open, onClose, content, actions } = props

  return (
    <MuiDialog onClose={onClose} open={open}>
      <div className="dialog-content">{content()}</div>
      {actions && (
        <div className="dialog-actions">{actions({ onClose: onClose })}</div>
      )}
    </MuiDialog>
  )
}

export default Dialog
