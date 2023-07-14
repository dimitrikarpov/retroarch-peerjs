import { ChangeEventHandler } from "react"
import { Core } from "../../App"

type Props = {
  core: Core
  setRom: React.Dispatch<React.SetStateAction<Uint8Array | undefined>>
  setCore: React.Dispatch<React.SetStateAction<Core>>
  setIsRomSelected: React.Dispatch<React.SetStateAction<boolean>>
}

export const RomSelect: React.FunctionComponent<Props> = ({
  core,
  setRom,
  setCore,
  setIsRomSelected,
}) => {
  const onRomUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files?.[0]) return

    const file = e.target.files?.[0]
    const buffer = await file?.arrayBuffer()

    setRom(new Uint8Array(buffer))
  }

  const onCoreChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCore(e.target.value as Core)
  }

  return (
    <div>
      <div>Select ROM:</div>
      <input
        type="file"
        onChange={onRomUpload}
        className="focus:shadow-te-primary relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
      />

      <div>Select Platform:</div>
      <select onChange={onCoreChange} value={core}>
        <option value="genesis_plus_gx_libretro">sega</option>
        <option value="fceumm_libretro">nes</option>
      </select>

      <button
        onClick={() => {
          setIsRomSelected(true)
        }}
      >
        OK
      </button>
    </div>
  )
}
