import { useConnection } from "@/webrtc"
import { useEffect, useRef } from "react"

export const ViewerScreen = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { peerRef } = useConnection()

  useEffect(() => {
    const subscribeOnCall = () => {
      if (!peerRef.current || !videoRef.current) return

      console.log("subscribeOnCall")

      peerRef.current.on("call", (call) => {
        console.log("peer.on.call")

        call.on("stream", (stream) => {
          console.log("call.on.stream", { stream })

          videoRef.current!.srcObject = stream
          setTimeout(() => {
            videoRef.current?.play()
          })
        })

        call.answer()
      })
    }

    subscribeOnCall()
  }, [])

  return (
    <div>
      <h2>New viewer screen</h2>

      <video ref={videoRef} width="800" height="600"></video>
    </div>
  )
}
