'use client'

import {
  Children,
  isValidElement,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react'

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F']

type QuizOptionProps = {
  children: ReactNode
  correct?: boolean
}

export function QuizOption({ children }: QuizOptionProps) {
  return <>{children}</>
}

type QuizExplanationProps = {
  children: ReactNode
}

export function QuizExplanation({ children }: QuizExplanationProps) {
  return <div className="quiz-explanation-body">{children}</div>
}

type QuizProps = {
  children: ReactNode
}

function QuizBase({ children }: QuizProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const items = Children.toArray(children) as ReactElement[]
  const options = items.filter(
    item => isValidElement(item) && item.type === QuizOption,
  ) as ReactElement<QuizOptionProps>[]
  const explanation = items.find(
    item => isValidElement(item) && item.type === QuizExplanation,
  )

  const correctIndex = options.findIndex(option => option.props.correct)
  const answered = selectedIndex !== null
  const isCorrect = selectedIndex === correctIndex

  return (
    <div className="quiz">
      <div className="quiz-options" role="radiogroup">
        {options.map((option, index) => {
          const isSelected = selectedIndex === index
          const isCorrectOption = index === correctIndex

          let state = 'idle'
          if (answered) {
            if (isCorrectOption) {
              state = 'correct'
            } else if (isSelected) {
              state = 'incorrect'
            } else {
              state = 'muted'
            }
          }

          return (
            <button
              key={index}
              type="button"
              className={`quiz-option quiz-option-${state}`}
              aria-pressed={isSelected}
              disabled={answered}
              onClick={() => setSelectedIndex(index)}
            >
              <span className="quiz-option-label">
                {OPTION_LABELS[index] ?? index + 1}
              </span>
              <span className="quiz-option-text">{option.props.children}</span>
            </button>
          )
        })}
      </div>

      {answered && (
        <div
          className={`quiz-feedback quiz-feedback-${isCorrect ? 'correct' : 'incorrect'}`}
          role="status"
        >
          {isCorrect
            ? '정답이에요!'
            : `아쉬워요. 정답은 ${OPTION_LABELS[correctIndex] ?? correctIndex + 1}예요.`}
        </div>
      )}

      {answered && explanation}

      {answered && (
        <button
          type="button"
          className="quiz-retry"
          onClick={() => setSelectedIndex(null)}
        >
          다시 풀어보기
        </button>
      )}
    </div>
  )
}

export const Quiz = Object.assign(QuizBase, {
  Option: QuizOption,
  Explanation: QuizExplanation,
})
