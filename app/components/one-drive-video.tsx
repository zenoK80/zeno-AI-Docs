import styles from './one-drive-video.module.css'

type OneDriveVideoProps = {
  src: string
  title: string
}

export function OneDriveVideo({ src, title }: OneDriveVideoProps) {
  return (
    <section aria-label={title} className={styles.video}>
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
    </section>
  )
}