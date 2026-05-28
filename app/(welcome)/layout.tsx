export default function WelcomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var audio = document.createElement('audio');
              audio.src = '/audio/rocky-mount-ambient.mp3';
              audio.loop = true;
              audio.volume = 0.15;
              audio.preload = 'none';
              var started = false;
              function start() {
                if (!started) { started = true; audio.play().catch(function(){}); }
              }
              document.addEventListener('click', start, { once: true });
              document.addEventListener('scroll', start, { once: true });
            })();
          `,
        }}
      />
    </>
  );
}
