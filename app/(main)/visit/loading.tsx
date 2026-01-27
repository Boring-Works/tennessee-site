import styles from '@/components/LoadingSkeleton/LoadingSkeleton.module.css'

export default function VisitLoading() {
  return (
    <div className={styles.loadingContainer}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--primary)',
          padding: '7rem 1rem 5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
          {/* Eyebrow */}
          <div
            className={styles.skeletonDark}
            style={{ width: '180px', height: '0.75rem', margin: '0 auto 1.5rem' }}
          />
          {/* Headline */}
          <div
            className={styles.skeletonDark}
            style={{ width: '350px', height: '3rem', margin: '0 auto 1.5rem' }}
          />
          {/* Subheadline */}
          <div
            className={styles.skeletonDark}
            style={{ width: '400px', maxWidth: '100%', height: '1.25rem', margin: '0 auto' }}
          />
        </div>
      </section>

      {/* Quick Info Cards */}
      <section style={{ background: 'var(--parchment)', padding: '4rem 1rem' }}>
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {/* Hours card */}
          <div className={styles.skeletonCard} style={{ height: '200px', padding: '2rem' }}>
            <div
              className={styles.skeleton}
              style={{ width: '60px', height: '1.5rem', marginBottom: '1.5rem' }}
            />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <div className={styles.skeleton} style={{ width: '80px', height: '0.875rem' }} />
                <div className={styles.skeleton} style={{ width: '100px', height: '0.875rem' }} />
              </div>
            ))}
          </div>

          {/* Admission card */}
          <div className={styles.skeletonCard} style={{ height: '200px', padding: '2rem' }}>
            <div
              className={styles.skeleton}
              style={{ width: '100px', height: '1.5rem', marginBottom: '1.5rem' }}
            />
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                }}
              >
                <div className={styles.skeleton} style={{ width: '100px', height: '0.875rem' }} />
                <div className={styles.skeleton} style={{ width: '40px', height: '0.875rem' }} />
              </div>
            ))}
          </div>

          {/* Location card */}
          <div className={styles.skeletonCard} style={{ height: '200px', padding: '2rem' }}>
            <div
              className={styles.skeleton}
              style={{ width: '80px', height: '1.5rem', marginBottom: '1.5rem' }}
            />
            <div
              className={styles.skeleton}
              style={{ width: '160px', height: '0.875rem', marginBottom: '0.5rem' }}
            />
            <div
              className={styles.skeleton}
              style={{ width: '140px', height: '0.875rem', marginBottom: '1.5rem' }}
            />
            <div
              className={styles.skeleton}
              style={{ width: '120px', height: '36px', borderRadius: '4px' }}
            />
          </div>
        </div>
      </section>

      {/* Who Walked Here Section */}
      <section style={{ background: 'white', padding: '5rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            className={styles.skeletonHeading}
            style={{ width: '200px', height: '2rem', margin: '0 auto 3rem' }}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={styles.skeletonCard}
                style={{
                  height: '280px',
                  padding: '2rem',
                  textAlign: 'center',
                }}
              >
                {/* Portrait circle */}
                <div
                  className={styles.skeletonCircle}
                  style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem' }}
                />
                {/* Name */}
                <div
                  className={styles.skeleton}
                  style={{ width: '140px', height: '1.25rem', margin: '0 auto 0.5rem' }}
                />
                {/* Title */}
                <div
                  className={styles.skeleton}
                  style={{ width: '180px', height: '0.875rem', margin: '0 auto 0.5rem' }}
                />
                {/* Years */}
                <div
                  className={styles.skeleton}
                  style={{ width: '80px', height: '0.75rem', margin: '0 auto 1rem' }}
                />
                {/* Hook */}
                <div
                  className={styles.skeleton}
                  style={{ width: '90%', height: '0.875rem', margin: '0 auto 0.25rem' }}
                />
                <div
                  className={styles.skeleton}
                  style={{ width: '70%', height: '0.875rem', margin: '0 auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ background: 'var(--parchment)', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <div
            className={styles.skeletonHeading}
            style={{ width: '180px', height: '1.5rem', margin: '0 auto 1.5rem' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '140px', height: '1rem', margin: '0 auto 1rem' }}
          />
          <div
            className={styles.skeleton}
            style={{ width: '200px', height: '1rem', margin: '0 auto' }}
          />
        </div>
      </section>
    </div>
  )
}
