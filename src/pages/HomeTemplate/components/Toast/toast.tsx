import { Toast } from "flowbite-react"
import { useEffect } from "react"
type Props = {
    message: string,
    show: boolean,
    onClose: () => void
}
export default function MessageToast({message, show, onClose}: Props ) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 2000);
            return clearTimeout(timer)
        }
    },[show])

    if(!show) return null
  return (
     <div className="fixed top-5 right-5 z-50">
      <Toast>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
          ✓
        </div>
        <div className="ml-3 text-sm font-normal">
          {message}
        </div>
       <button
          onClick={onClose}
          className="ml-4 text-gray-400 cursor-pointer hover:text-white"
        >
          ✕
        </button>
     
      </Toast>
    </div>
  )
}
