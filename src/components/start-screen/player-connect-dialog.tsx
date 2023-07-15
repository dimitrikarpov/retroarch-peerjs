import { useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"
import { PlayerConnect } from "./player-connect"

type Props = {
  onConnect: () => void
}

export const PlayerConnectDialog: React.FunctionComponent<Props> = ({
  onConnect,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>connect</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>connecting to the viewer</DialogTitle>
          <DialogDescription>
            Get Your ID and send it to the viewer
          </DialogDescription>
        </DialogHeader>
        <PlayerConnect onConnect={onConnect} />
      </DialogContent>
    </Dialog>
  )
}
