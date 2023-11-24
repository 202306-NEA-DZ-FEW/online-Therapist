import {useRouter} from "next/router"
import {useTranslation} from "next-i18next"
import {useState} from "react"
import {toast} from "react-toastify"

import {useAuth} from "@/context/AuthContext"
const DEFAULT_EMOJIS = [
  {
    label: "like",
    emoji: "👍",
    counter: 0,
  },
  {
    label: "eye-heart",
    emoji: "😍",
    counter: 0,
  },
  {
    label: "open_mouth",
    emoji: "😮",
    counter: 0,
  },
  {
    label: "salute-face",
    emoji: "🫡",
    counter: 0,
  },
  {
    label: "clap",
    emoji: "👏",
    counter: 0,
  },
  {
    label: "graduation",
    emoji: "🎉",
    counter: 0
  }
]

const Reactions = ({language, postId, title, reactions}) => {
  const {t} = useTranslation("blog")
  const {user} = useAuth()
  const router = useRouter()
  const [emojis, setEmojis] = useState(
    reactions != null ? reactions : DEFAULT_EMOJIS
  )

  const updateNumber = async (index) => {
    if (!user) {
      toast.error(t("loggin_first"))

      return
    }

    let new_emojis = [...emojis]
    new_emojis[index].counter++
    setEmojis(new_emojis)

    try {
      const response = await fetch("/api/blog/reactions", {
        method: "POST",
        body: JSON.stringify({_id: postId, reactions: emojis, title}),
        type: "application/json",
      })
      if (response.ok) {
        router.replace(router.asPath, undefined, {scroll: false})
        toast.success(t("reaction_saved"))
      }
    } catch (err) {
      toast.error(err)
    }
  }
  return (
    <div className='flex flex-row gap-4 justify-center mb-10 '>
      {emojis.map((emoji, i) => (
        <div
          className='relative py-2 w-8 hover:cursor-pointer hover:scale-125 transition-all duration-300'
          key={emoji}
          onClick={() => updateNumber(i)}
        >
          <div
            className={`${language == "ar"
              ? "t-0  -left-3"
              : "t-0  -right-3"
              } ${emoji.counter > 0 ? 'absolute' : 'hidden'}`}
          >
            <p className='flex  items-center justify-center rounded-full bg-red-500 p-3 text-[.77rem] font-semibold text-white w-3 md:h-5 h-3 md:w-5'>
              {emoji.counter}
            </p>
          </div>
          <span className='text-[1.5rem] md:text-[2rem] mt-1.5 block' role='image'>
            {emoji.emoji}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Reactions
