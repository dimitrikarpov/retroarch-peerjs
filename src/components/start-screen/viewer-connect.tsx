import { useEffect, useRef, useState } from "react"
import { useConnection } from "../../webrtc"
import Peer from "peerjs"
import { Button } from "../ui/button"

type Props = {
  onConnect: () => void
}

export const ViewerConnect: React.FunctionComponent<Props> = ({
  onConnect,
}) => {
  const [playerPeerId, setPlayerPeerId] = useState<string>()
  const playerPeerInputRef = useRef<HTMLInputElement>(null)

  const { peerRef, dataConnectionRef } = useConnection()
  const [peerId, setPeerId] = useState<string>()
  const [dataConnectionReady, setDataConnectionReady] = useState(false)

  useEffect(() => {
    peerRef.current = new Peer()

    peerRef.current.on("open", function (id) {
      setPeerId(id)
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

    // peerRef.current.on("call", (call) => {
    //   console.log("peer.on.call")

    //   call.on("stream", (stream) => {
    //     console.log("call.on.stream", { stream })

    //     // videoRef.current!.srcObject = stream
    //     // setTimeout(() => {
    //     //   videoRef.current?.play()
    //     // })
    //   })

    //   call.answer()
    // })

    console.log({ peerRef })
  }, [])

  const onAddPlayerIdButtonClick = () => {
    if (!peerRef.current) return

    setPlayerPeerId(playerPeerInputRef.current?.value)

    console.log("HERE")

    const conn = peerRef.current.connect(playerPeerInputRef.current!.value)

    dataConnectionRef.current = conn

    conn.on("open", () => {
      conn.send("hi!")
      setDataConnectionReady(true)
      onConnect()
    })

    conn.on("data", (data) => {
      console.log("connection.on.data 222", { data })
    })
  }

  return (
    <div>
      {!playerPeerId && (
        <div>
          <input ref={playerPeerInputRef} />
          <Button variant="outline" onClick={onAddPlayerIdButtonClick}>
            add player id
          </Button>
        </div>
      )}

      {peerId && <p>My peer ID is: {peerId}</p>}

      {dataConnectionReady && (
        <p className="text-green-500 text-center font-extrabold text-lg uppercase ">
          connected
        </p>
      )}
    </div>
  )
}
