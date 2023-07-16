import { useEffect, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"
import { Skeleton } from "../ui/skeleton"

type Props = {
  onConnect: () => void
}

export const PlayerConnect: React.FunctionComponent<Props> = ({
  onConnect,
}) => {
  const { peerRef, dataConnectionRef } = useConnection()
  const [peerId, setPeerId] = useState<string>()
  // const [viewerPeerId, setViewerPeerId] = useState<string>()
  const [dataConnectionReady, setDataConnectionReady] = useState(false)

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setPeerId(id)
    })

    peerRef.current.on("connection", (conn) => {
      console.log("on.connection", { conn })

      dataConnectionRef.current = conn

      // setViewerPeerId(conn.peer)

      conn.on("data", (data) => {
        console.log("connection.on.data", { data })
      })

      conn.on("open", () => {
        console.log("on.open")
      })

      setDataConnectionReady(true)
      onConnect()
    })

    console.log({ peerRef })
  }, [])

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div>My ID</div>
        {!peerId && <Skeleton className="h-4 w-[300px]" />}
        {peerId && <div>{peerId}</div>}
      </div>
      {dataConnectionReady && (
        <p className="text-green-500 text-center font-extrabold text-lg uppercase ">
          connected
        </p>
      )}
    </div>
  )
}
