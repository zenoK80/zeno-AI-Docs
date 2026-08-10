'use client'

import { Fragment, useId, useState, type ReactNode } from 'react'
import styles from './quiz.module.css'

const choiceMarkers = ['①', '②', '③', '④', '⑤', '⑥']

const INLINE_PATTERN = /`([^`]+)`|\*\*([^*]+)\*\*|<sup>([^<]+)<\/sup>/g

function renderInline(text: string): ReactNode {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null

  INLINE_PATTERN.lastIndex = 0
  while ((match = INLINE_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(
        <Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>,
      )
    }
    if (match[1] !== undefined) {
      nodes.push(<code key={key++}>{match[1]}</code>)
    } else if (match[2] !== undefined) {
      nodes.push(<strong key={key++}>{match[2]}</strong>)
    } else {
      nodes.push(<sup key={key++}>{match[3]}</sup>)
    }
    lastIndex = INLINE_PATTERN.lastIndex
  }
  if (lastIndex < text.length) {
    nodes.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>)
  }

  return nodes
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
          {renderInline(question)}
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
                <span className={styles.optionText}>{renderInline(option)}</span>
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
          <p className={styles.explanation}>{renderInline(explanation)}</p>

          <div className={styles.optionReview}>
            <p className={styles.optionReviewTitle}>선택지 해설</p>
            <ul>
              {options.map((_, index) => (
                <li key={index}>
                  <strong>{choiceMarkers[index] ?? index + 1}</strong>{' '}
                  {renderInline(optionExplanations[index])}
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
