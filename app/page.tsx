'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import localFont from 'next/font/local'

type Question = {
  id: number
  type: string
  question: string
  image: string
  options: string[]
  answer: number
}

const pixelFont = localFont({
  src: '../fonts/PressStart2P-Regular.ttf',
  display: 'swap',
})


const originalQuestions = [
  {
    id: 1,
    type: 'image',
    question: '請問這是哪部芭比動畫電影？',
    image: '/questions/question1.png',
    options: ['《長髮公主芭比》', '《芭比之天鵝湖公主》', '《真假公主芭比》', '《芭比之鑽石城堡》'],
    answer: 2,
  },
  {
    id: 2,
    type: 'image',
    question: '請問這個角色叫什麼名字？',
    image: '/questions/question2.png',
    options: ['好奇貓', '膽小貓', '寶寶貓', '神奇貓'],
    answer: 1,
  },
  {
    id: 3,
    type: 'image',
    question: '這是《真珠美人魚》中的哪一首歌？',
    image: '/questions/question3.png',
    options: ['黑色的協奏曲', '黑暗的巴洛克', '黑色的羽翼', '看不到明天'],
    answer: 1,
  },
  {
    id: 4,
    type: 'image',
    question: '請問在《飛哥與小佛》中，片頭曲的暑假有幾天？',
    image: '/questions/question4.png',
    options: ['107', '105', '110', '104'],
    answer: 3,
  },
  {
    id: 5,
    type: 'image',
    question: '請問在《魔法咪路咪路》中，像毛毛蟲又像蛞蝓的生物叫什麼？',
    image: '/questions/question5.png',
    options: ['不知道', '軟趴趴', '黏黏', '不曉得'],
    answer: 0,
  },
  {
    id: 6,
    type: 'image',
    question: '請問這是哪部卡通的男主角？',
    image: '/questions/question6.png',
    options: ['《真珠美人魚》', '《守護甜心》', '《美少女戰士》', '《玩偶遊戲》'],
    answer: 3,
  },
  {
    id: 7,
    type: 'image',
    question: '請問《崖上的波妞》中，波妞特別喜歡吃哪一種食物？',
    image: '/questions/question7.png',
    options: ['泡麵', '培根', '火腿', '拉麵'],
    answer: 2,
  },
  {
    id: 8,
    type: 'image',
    question: '請問《大嘴鳥》中，神秘怪物叫什麼名字？',
    image: '/questions/question8.png',
    options: ['嘻巴嘻巴', '烏漆麻黑', '不知道', '灰姑娘'],
    answer: 0,
  },
  {
    id: 9,
    type: 'image',
    question: '請問《天兵公園》中，公園的經理是誰？',
    image: '/questions/question9.png',
    options: ['鳥哥', '阿天', '棒棒伯', '本森'],
    answer: 2,
  },
  {
    id: 10,
    type: 'image',
    question: '請問酷洛米的部下叫什麼名字？',
    image: '/questions/question10.png',
    options: ['巴庫', '庫巴', '巴酷', '酷巴'],
    answer: 0,
  },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}



export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [timeLeft, setTimeLeft] = useState(5)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const shuffled = shuffleArray(originalQuestions)
    setQuestions(shuffled)
  }, [])

  useEffect(() => {
    if (timeLeft === 0) {
      setShowAnswer(true)
      return
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  if (questions.length === 0) return null

  const q = questions[current]

  const handleSelect = (index) => {
    if (selected === null) {
      setSelected(index)
      setShowAnswer(true)
      if (index === q.answer) {
        setCorrectCount((prev) => prev + 1)
      }
    }
  }

  const next = () => {
    if (current + 1 >= questions.length) {
      setIsFinished(true)
      return
    }
    setCurrent((prev) => prev + 1)
    setSelected(null)
    setTimeLeft(5)
    setShowAnswer(false)
  }

  const restart = () => {
    const reshuffled = shuffleArray(originalQuestions)
    setQuestions(reshuffled)
    setCurrent(0)
    setSelected(null)
    setTimeLeft(5)
    setShowAnswer(false)
    setCorrectCount(0)
    setIsFinished(false)
  }

  return (
    <div
      className={`min-h-screen text-pink-300 flex flex-col items-center justify-center px-6 py-10 ${pixelFont.className}`}
      style={{
        backgroundImage: `url('/backgrounds/bg-y2k-pink.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {isFinished ? (
        <div className="text-center bg-black/80 p-8 rounded-lg border-4 border-pink-500 shadow-crt">
          <h2 className="text-xl font-bold mb-4">🎉 遊戲結束！</h2>
          <p className="text-pink-200">
            你總共答對了 <span className="text-pink-400 font-bold">{correctCount}</span> / {questions.length} 題
          </p>
          <button
            onClick={restart}
            className="mt-6 bg-pink-400 hover:bg-pink-500 text-black text-xs font-bold px-6 py-3 rounded-full border-4 border-pink-700 shadow-md hover:scale-105 active:scale-95"
          >
            再玩一次！
          </button>
        </div>
      ) : (
        <>
          <div className="text-xs tracking-widest mb-4 bg-black/80 px-4 py-1 rounded border border-pink-300 shadow-crt">
            第 {current + 1} 題 / {questions.length} 題
          </div>

          <div className="w-full max-w-md border-[10px] border-pink-500 bg-black/80 backdrop-blur-sm p-6 rounded-[1.5rem] shadow-crt relative">
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 text-xs bg-pink-300 text-black font-bold px-4 py-1 rounded border-2 border-pink-700 shadow">
              CHILDHOOD BATTLE
            </div>

            {q.type === 'image' && q.image && (
              <Image
                src={q.image}
                alt="題目圖片"
                width={400}
                height={300}
                className="rounded mb-4 border-2 border-pink-300 shadow-inner"
              />
            )}

            <div className="text-sm text-center text-pink-100 bg-[#1a1a1a] p-3 mb-6 rounded border border-pink-400 shadow-inner">
              {q.question}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selected !== null}
                  className={`px-4 py-3 rounded text-black text-xs tracking-wide border-4 shadow-md transition-all
                    ${selected === idx
                      ? idx === q.answer
                        ? 'bg-green-300 border-green-700'
                        : 'bg-red-300 border-red-700'
                      : 'bg-pink-200 hover:bg-pink-300 border-pink-600'}
                    hover:scale-105 active:scale-95`}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              ))}
            </div>

            <div className="mt-6 text-center text-xs text-pink-300 font-semibold">
              {showAnswer
                ? selected === q.answer
                  ? '✅ 答對了！'
                  : `❌ 答錯了，正確答案是 ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`
                : `⏳ 倒數 ${timeLeft} 秒`}
            </div>

            {showAnswer && (
              <div className="mt-6 text-center">
                <button
                  onClick={next}
                  className="bg-pink-400 hover:bg-pink-500 text-black text-xs font-bold px-6 py-3 rounded-full border-4 border-pink-700 shadow-md hover:scale-105 active:scale-95"
                >
                  ▶️ 下一題
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <style jsx>{`
        .shadow-crt {
          box-shadow:
            0 0 4px #f9c,
            0 0 8px #f9c,
            0 0 16px #f9c,
            inset 0 0 6px #f9c;
        }
      `}</style>
    </div>
  )
}
