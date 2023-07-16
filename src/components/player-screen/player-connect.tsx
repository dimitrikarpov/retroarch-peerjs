import { useEffect, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"
import { Skeleton } from "../ui/skeleton"
//@ts-ignore
import clipboard from "clipboardy"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

type Props = {
  onConnect: () => void
}

export const PlayerConnect: React.FunctionComponent<Props> = ({
  onConnect,
}) => {
  const { peerRef, dataConnectionRef } = useConnection()
  const [peerId, setPeerId] = useState<string>()

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setPeerId(id)
    })

    peerRef.current.on("connection", (conn) => {
      console.log("on.connection", { conn })

      dataConnectionRef.current = conn

      conn.on("data", (data) => {
        console.log("connection.on.data", { data })
      })

      conn.on("open", () => {
        console.log("on.open")
      })

      onConnect()
    })

    console.log({ peerRef })
  }, [])

  return (
    <div>
      <div className="flex gap-2 items-center">
        {!peerId && <Skeleton className="h-4 w-[300px]" />}
        {peerId && (
          <>
            <Input value={peerId} disabled />
            <Button onClick={() => clipboard.write(peerId)}>copy</Button>
          </>
        )}
      </div>
    </div>
  )
}
