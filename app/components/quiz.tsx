'use client'

import { useId, useState, type ReactNode } from 'react'
import katex from 'katex'
import styles from './quiz.module.css'

const choiceMarkers = ['①', '②', '③', '④', '⑤', '⑥']

// Quiz의 question/options/explanation은 일반 문자열 prop이라 MDX의
// KaTeX 파이프라인을 거치지 않는다. "$...$" 인라인 수식만 직접 렌더링한다.
function renderWithMath(text: string): ReactNode[] {
  const parts = text.split(/(\$[^$]+\$)/g)
  return parts.map((part, index) => {
    if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
      const expr = part.slice(1, -1)
      try {
        const html = katex.renderToString(expr, { throwOnError: false })
        // eslint-disable-next-line react/no-danger
        return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />
      } catch {
        return <span key={index}>{part}</span>
      }
    }
    return <span key={index}>{part}</span>
  })
}

type QuizProps = {
  questionNumber: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  optionExplanations: string[]
}

export function Quiz({
  questionNumber,
  question,
  options,
  correctAnswer,
  explanation,
  optionExplanations,
}: QuizProps) {
  const quizId = useId()
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const hasAnswered = selectedAnswer !== null
  const isCorrect = selectedAnswer === correctAnswer
  const feedbackId = `${quizId}-feedback`

  function resetQuiz() {
    setSelectedAnswer(null)
  }

  return (
    <section className={styles.quiz} aria-labelledby={`${quizId}-question`}>
      <div className={styles.heading}>
        <span className={styles.questionNumber}>문제 {questionNumber}</span>
        <span className={styles.questionType}>4지선다</span>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.question} id={`${quizId}-question`}>
          {renderWithMath(question)}
        </legend>

        <div className={styles.options}>
          {options.map((option, index) => {
            const optionNumber = index + 1
            const isSelected = selectedAnswer === optionNumber
            const isAnswer = hasAnswered && optionNumber === correctAnswer
            const isWrongSelection = hasAnswered && isSelected && !isAnswer
            const optionClassName = [
              styles.option,
              isSelected ? styles.selected : '',
              isAnswer ? styles.correct : '',
              isWrongSelection ? styles.incorrect : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <label className={optionClassName} key={optionNumber}>
                <input
                  aria-describedby={hasAnswered ? feedbackId : undefined}
                  checked={isSelected}
                  className={styles.radio}
                  disabled={hasAnswered}
                  name={quizId}
                  onChange={() => setSelectedAnswer(optionNumber)}
                  type="radio"
                  value={optionNumber}
                />
                <span className={styles.marker} aria-hidden="true">
                  {choiceMarkers[index] ?? optionNumber}
                </span>
                <span className={styles.optionText}>{renderWithMath(option)}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      {hasAnswered && (
        <div
          className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}
          id={feedbackId}
          role="status"
        >
          <p className={styles.result}>
            {isCorrect
              ? '정답이에요.'
              : `오답이에요. 정답은 ${choiceMarkers[correctAnswer - 1] ?? correctAnswer}입니다.`}
          </p>
          <p className={styles.explanation}>{renderWithMath(explanation)}</p>

          <div className={styles.optionReview}>
            <p className={styles.optionReviewTitle}>선택지 해설</p>
            <ul>
              {options.map((_, index) => (
                <li key={index}>
                  <strong>{choiceMarkers[index] ?? index + 1}</strong>{' '}
                  {renderWithMath(optionExplanations[index])}
                </li>
              ))}
            </ul>
          </div>

          <button className={styles.retryButton} onClick={resetQuiz} type="button">
            다시 풀기
          </button>
        </div>
      )}
    </section>
  )
}
