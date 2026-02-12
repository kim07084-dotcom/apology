"use client"
import React, { useRef, useState, useEffect } from 'react'
import styles from './styles.module.css'

export default function Apology() {
  const rejectRef = useRef<HTMLButtonElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (rejectRef.current) rejectRef.current.style.transition = 'transform 0.12s ease'
  }, [])

  function moveReject() {
    const reject = rejectRef.current
    const container = containerRef.current
    if (!reject || !container) return
    const contRect = container.getBoundingClientRect()
    const btnRect = reject.getBoundingClientRect()
    const padding = 12
    const maxX = Math.max(0, contRect.width - btnRect.width - padding)
    const maxY = Math.max(0, contRect.height - btnRect.height - padding)
    const x = Math.floor(Math.random() * maxX)
    const y = Math.floor(Math.random() * maxY)
    reject.style.transform = `translate(${x}px, ${y}px)`
  }

  return (
    <div className={styles.page}>
      <div className={styles.card} ref={containerRef}>
        <div className={styles.header}>
          {/* 이미지가 public/images/apology.png로 추가되면 자동으로 표시됩니다 */}
          <img src="/images/apology.png" alt="미안해" className={styles.apologyImg} onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
          <svg className={styles.heart} viewBox="0 0 24 24" fill="#ff6b6b" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 21s-7-4.35-9-7.09C-1.1 9.66 3.6 4 8.5 6.09c1.8.77 3.1 2.6 3.5 3.41.4-.81 1.7-2.64 3.5-3.41C20.4 4 25.1 9.66 21 13.91 19 16.65 12 21 12 21z" />
          </svg>
          <h1 className={styles.title}>내 사과를 받아줄래..?</h1>
          <p className={styles.subtitle}>상처줘서 진심으로 미안해.. 앞으로 정신차리고 잘할게..</p>
        </div>

        <div className={styles.controls}>
          <button className={styles.accept} onClick={() => setOpen(true)}>
            괘씸하지만 사과를 받아준다..
          </button>
          <button
            ref={rejectRef}
            className={styles.reject}
            onMouseEnter={() => setTimeout(moveReject, 60)}
            onFocus={() => moveReject()}
            onClick={(e) => {
              e.preventDefault()
              moveReject()
            }}
          >
            절대 안받는다
          </button>
        </div>
      </div>

      {open && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className={styles.modalInner}>
            <h2 id="modal-title">고마워 ❤️</h2>
            <p>앞으로 평생 아영이만 바라보고 실수 안하고 잘할게!! 항상 고맙고 사랑해 ❤️</p>
            <button className={styles.close} onClick={() => setOpen(false)}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
