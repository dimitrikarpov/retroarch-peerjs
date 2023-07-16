import { useEffect, useRef, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { Input } from "../ui/input"
//@ts-ignore
import clipboard from "clipboardy"

type Props = {
  onConnect: () => void
}

export const ViewerConnect: React.FunctionComponent<Props> = ({
  onConnect,
}) => {
  const playerPeerInputRef = useRef<HTMLInputElement>(null)
  const { peerRef, dataConnectionRef } = useConnection()
  const [connectedWithSignalingService, setConnectedWithSignalingService] =
    useState(false)
  const [startConnectingWithPeer, setStartConnectingWithPeer] = useState(false)

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setConnectedWithSignalingService(true)
      setTimeout(() => {
        playerPeerInputRef.current?.focus()
      })
    })

    peerRef.current.on("connection", (conn) => {
      console.log("on.connection", { conn })

      conn.on("data", (data) => {
        console.log("connection.on.data", { data })
      })

      conn.on("open", () => {
        console.log("on.open")
      })
    })

    console.log({ peerRef })
  }, [])

  const onAddPlayerIdButtonClick = () => {
    if (!peerRef.current) return

    setStartConnectingWithPeer(true)

    const conn = peerRef.current.connect(playerPeerInputRef.current!.value)

    dataConnectionRef.current = conn

    conn.on("open", () => {
      conn.send("hi!")
      onConnect()
    })

    conn.on("data", (data) => {
      console.log("connection.on.data 222", { data })
    })
  }

  const onPasteBtnClick = () => {
    if (!playerPeerInputRef.current) return

    clipboard.read().then((something: string) => {
      playerPeerInputRef.current!.value = something
    })
  }

  return (
    <div>
      {!connectedWithSignalingService && <Skeleton className="h-10" />}

      {connectedWithSignalingService && (
        <div className="flex gap-2">
          <Input ref={playerPeerInputRef} disabled={startConnectingWithPeer} />
          <Button onClick={onPasteBtnClick} variant={"outline"}>
            paste
          </Button>

          <Button
            onClick={onAddPlayerIdButtonClick}
            disabled={startConnectingWithPeer}
          >
            OK
          </Button>
        </div>
      )}
    </div>
  )
}
