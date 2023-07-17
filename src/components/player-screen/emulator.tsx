import { Retroarch } from "retroarch-react"
import { type Retroarch as RetroarchCore } from "retroarch-core"

type Props = {
  coreUrl: string
  romBinary: Uint8Array
  retroarchRef: React.MutableRefObject<RetroarchCore | null>
  onStart?: () => void
}

export const Emulator: React.FunctionComponent<Props> = ({
  coreUrl,
  romBinary,
  retroarchRef,
  onStart,
}) => {
  const onEmulatorStart = (retroarch: RetroarchCore) => {
    retroarchRef.current = retroarch

    onStart?.()
  }

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% )",
      }}
    >
      <Retroarch
        containerClassName="max-h-[100dvh] max-w-[100dvw] aspect-[calc(800/600)]  mx-auto my-0"
        canvasBoxClassName="relative aspect-[calc(800/600)] max-h-full max-w-full"
        onStart={onEmulatorStart}
      >
        <Retroarch.StartScreen className="absolute inset-0 flex h-full items-center justify-center">
          <Retroarch.StartScreen.Button className="ease focus:shadow-outline m-2 select-none rounded-md border border-indigo-500 bg-indigo-500 px-4 py-2 text-white transition duration-500 hover:bg-indigo-600 focus:outline-none" />
        </Retroarch.StartScreen>

        <Retroarch.LoaderScreen
          className="absolute inset-0 flex h-full items-center justify-center"
          coreUrl={coreUrl}
          romBinary={romBinary}
          loadOnMount
        >
          <Retroarch.LoaderScreen.Progress />
        </Retroarch.LoaderScreen>
      </Retroarch>
    </div>
  )
}
