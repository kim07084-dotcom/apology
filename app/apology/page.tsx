"use client"

import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'

const deliverySteps = [
  {
    title: '사과 접수',
    detail: '또 실수가 반복되어서 아영이한테 상처 준 거 정말 미안해..',
  },
  {
    title: '보고싶음 포장',
    detail: '너무 보고싶었고, 지금도 아영이가 많이 보고싶어..',
  },
  {
    title: '약속 동봉',
    detail: '조금이라도 피곤하면 미리 말하고, 먼저 아영이 입장에서 생각할게.',
  },
  {
    title: '마음 배송 완료',
    detail: '앞으로도 평생 아영이만 바라볼게.',
  },
]

const receiptItems = [
  ['미안함', '진심 100%'],
  ['보고싶음', '매우 많이'],
  ['사랑함', '매일 갱신'],
  ['잘할게', '말보다 행동'],
]

const letterLines = [
  '아영아, 정말 미안해..',
  '서운하게 만든 것도, 마음 쓰이게 한 것도 너무 미안해..',
  '너무 보고싶고, 앞으로는 아영이 마음을 더 먼저 생각하면서 잘할게.',
]

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export default function Apology() {
  const rejectRef = useRef<HTMLButtonElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [deliveryStep, setDeliveryStep] = useState(0)
  const [heartRain, setHeartRain] = useState(false)

  const progress = ((deliveryStep + 1) / deliverySteps.length) * 100
  const currentStep = deliverySteps[deliveryStep]
  const isDelivered = deliveryStep === deliverySteps.length - 1

  const floatingHearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${8 + ((index * 17) % 84)}%`,
        delay: `${(index % 6) * 0.22}s`,
        size: `${12 + (index % 4) * 4}px`,
      })),
    [],
  )

  useEffect(() => {
    if (rejectRef.current) rejectRef.current.style.transition = 'transform 0.16s ease'
  }, [])

  function moveReject() {
    const reject = rejectRef.current
    const container = containerRef.current
    if (!reject || !container) return

    const contRect = container.getBoundingClientRect()
    const btnRect = reject.getBoundingClientRect()
    const padding = 20
    const maxX = Math.max(0, contRect.width - btnRect.width - padding)
    const maxY = Math.max(0, contRect.height - btnRect.height - padding)
    const x = Math.floor(Math.random() * maxX)
    const y = Math.floor(Math.random() * maxY)
    reject.style.transform = `translate(${x}px, ${y}px)`
  }

  function advanceDelivery() {
    setDeliveryStep((step) => (step + 1) % deliverySteps.length)
  }

  function acceptApology() {
    if (!isDelivered) return
    setOpen(true)
    setHeartRain(true)
    window.setTimeout(() => setHeartRain(false), 2800)
  }

  return (
    <main className={styles.page}>
      <div className={styles.ambient} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      {heartRain && (
        <div className={styles.heartRain} aria-hidden="true">
          {floatingHearts.map((heart) => (
            <span
              key={heart.id}
              style={{
                left: heart.left,
                animationDelay: heart.delay,
                width: heart.size,
                height: heart.size,
              }}
            />
          ))}
        </div>
      )}

      <section className={styles.card} ref={containerRef} aria-label="사과 마음 배송">
        <div className={styles.photoWrap}>
          <img
            src={`${basePath}/images/apology.png`}
            alt="미안한 마음을 담은 그림"
            className={styles.apologyImg}
            onError={(event) => {
              ;(event.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>

        <div className={styles.header}>
          <p className={styles.kicker}>아영이 전용 마음 배송</p>
          <h1 className={styles.title}>미안해, 그리고 너무 보고싶어</h1>
          <p className={styles.subtitle}>
            아직 마음이 풀리지 않았어도 괜찮아. 내가 더 잘할게, 정말 많이 보고싶어.
          </p>
        </div>

        <div className={styles.deliveryPanel}>
          <div className={styles.deliveryTop}>
            <div>
              <span>배송 상태</span>
              <strong>{currentStep.title}</strong>
            </div>
            <button type="button" onClick={advanceDelivery}>
              다음 단계
            </button>
          </div>

          <div className={styles.route} aria-label="마음 배송 진행률">
            <div className={styles.routeTrack}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.routeStops}>
              {deliverySteps.map((step, index) => (
                <button
                  key={step.title}
                  type="button"
                  className={index <= deliveryStep ? styles.stopActive : ''}
                  onClick={() => setDeliveryStep(index)}
                  aria-label={`${step.title} 단계 보기`}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>

          <p className={styles.deliveryText}>{currentStep.detail}</p>

          <div className={styles.receipt} aria-label="마음 영수증">
            <div className={styles.receiptHeader}>
              <span>마음 영수증</span>
              <strong>환불 불가</strong>
            </div>
            {receiptItems.map(([name, value]) => (
              <div className={styles.receiptRow} key={name}>
                <span>{name}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.controls}>
          <button
            className={`${styles.accept} ${!isDelivered ? styles.acceptLocked : ''}`}
            onClick={acceptApology}
            disabled={!isDelivered}
          >
            {isDelivered ? '마음 배송 받기' : '배송 완료 기다리기'}
          </button>
          <button
            ref={rejectRef}
            className={styles.reject}
            onMouseEnter={() => setTimeout(moveReject, 60)}
            onFocus={moveReject}
            onClick={(event) => {
              event.preventDefault()
              moveReject()
            }}
          >
            아직 수령 거부
          </button>
        </div>
      </section>

      {open && (
        <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className={styles.modalInner}>
            <button className={styles.xButton} onClick={() => setOpen(false)} aria-label="닫기">
              ×
            </button>
            <p className={styles.modalKicker}>배송 완료</p>
            <h2 id="modal-title">아영이한테 도착한 진심</h2>
            <div className={styles.letter}>
              {letterLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <button className={styles.close} onClick={() => setOpen(false)}>
              확인했어
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
