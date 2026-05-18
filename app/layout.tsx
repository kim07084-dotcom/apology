export const metadata = {
  title: '미안해, 많이 사랑해',
  description: '마음을 전하는 작은 사과 페이지',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
