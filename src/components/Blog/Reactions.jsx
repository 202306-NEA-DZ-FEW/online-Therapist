import {useRouter} from 'next/router'
import {useState} from 'react'
import {toast} from 'react-toastify'
const DEFAULT_EMOJIS = [
  {
    label: "like",
    emoji: "👍",
    counter: 0
  },
  {
    label: "eye-heart",
    emoji: "😍",
    counter: 0
  },
  {
    label: "open_mouth",
    emoji: "😮",
    counter: 0

  },
  {
    label: "salute-face",
    emoji: "🫡",
    counter: 0

  },
  {
    label: "clap",
    emoji: "👏",
    counter: 0
  }
]

const Reactions = ({language, postId, title, reactions}) => {
  const router = useRouter()
  const [emojis, setEmojis] = useState(reactions != null ? reactions : DEFAULT_EMOJIS)

  const updateNumber = async (index) => {

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
        toast.success("comment added successfully")

      }
    } catch (err) {
      console.log(err)

    }

  }
  return (
    <div className='flex flex-row gap-4 justify-center mb-10 '>

      {emojis.map((emoji, i) => (
        <div
          className="relative py-2 w-8 hover:cursor-pointer hover:scale-125 transition-all duration-300"


          key={emoji}
          onClick={() => updateNumber(i)}
        >
          <div className={`${language == 'ar' ? 't-0 absolute -left-3' : 't-0 absolute -right-3'}`}

          >
            <p className="flex  items-center justify-center rounded-full bg-red-500 p-3 text-[.77rem] font-semibold text-white h-5 w-5">
              {emoji.counter}
            </p>
          </div>
          <span className="text-[2rem] mt-1.5 block"
            role="image"

          >
            {emoji.emoji}
          </span>
        </div>

      ))
      }


    </div >

  )
}

export default Reactions