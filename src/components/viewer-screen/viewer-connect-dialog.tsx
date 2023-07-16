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
import { ViewerConnect } from "./viewer-connect"

type Props = {
  onConnect: () => void
}

export const ViewerConnectDialog: React.FunctionComponent<Props> = ({
  onConnect,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          No, thanks! I want to watch remote gameplay
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>waiting connection from the player</DialogTitle>
          <DialogDescription>set player's ID</DialogDescription>
        </DialogHeader>
        <ViewerConnect onConnect={onConnect} />
      </DialogContent>
    </Dialog>
  )
}
