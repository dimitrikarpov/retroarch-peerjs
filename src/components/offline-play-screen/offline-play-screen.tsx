import { Core } from "@/App"
import { Emulator } from "../emulator/emulator"

type Props = {
  core: Core
  rom: Uint8Array
}

export const OfflinePlayScreen: React.FunctionComponent<Props> = ({
  core,
  rom,
}) => {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% )",
      }}
    >
      <Emulator core={core} rom={rom} />
    </div>
  )
}

// background-image: linear-gradient( 109.6deg,  rgba(177,173,219,1) 11.2%, rgba(245,226,226,1) 91.1% );
// background-image: linear-gradient( 109.6deg,  rgba(238,58,136,1) 11.2%, rgba(128,162,245,1) 91.1% );
// background-image: linear-gradient( 65.4deg,  rgba(56,248,249,1) -9.1%, rgba(213,141,240,1) 48%, rgba(249,56,152,1) 111.1% );
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(151,10,130,1) 0%, rgba(33,33,33,1) 100.2% );
