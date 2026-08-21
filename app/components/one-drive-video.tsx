import styles from './one-drive-video.module.css'

type OneDriveVideoProps = {
  src: string
  title: string
}

export function OneDriveVideo({ src, title }: OneDriveVideoProps) {
  return (
    <figure className={styles.video}>
      <div className={styles.frame}>
        <iframe
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          src={src}
          title={title}
        />
      </div>
      <figcaption>
        NotebookLM 학습 영상입니다. 재생이 되지 않으면{' '}
        <a href={src} rel="noreferrer" target="_blank">
          OneDrive에서 열기
        </a>
        로 시청하세요.
      </figcaption>
    </figure>
  )
}