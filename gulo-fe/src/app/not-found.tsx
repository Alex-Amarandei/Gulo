const NotFoundPage = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/o-YBDTqX_ZU?autoplay=1&mute=0'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen></iframe>
    </div>
  );
};

export default NotFoundPage;
