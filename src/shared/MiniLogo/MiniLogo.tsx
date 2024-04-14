import './MiniLogo.css';

interface IMiniLogo {
  link?: string;
  className?: string;
  noLink?: boolean;
  withSecret?: boolean;
}

// Yes, I did a component for this little logo thing.
export default function MiniLogo({
  link = '/main',
  className = '',
  noLink = false,
  withSecret = false
}) {
  if (noLink) {
    return (
      <img
        src="/favicon.png"
        alt="UwU novels"
        className={`miniLogo ${className}`}
      />
    );
  }

  let secret = <div />;
  if (withSecret) {
    secret = (
      <img
        src="/favicon2.png"
        alt="UwU secret"
        className={`secret ${className}`}
      />
    );
  }

  return (
    <a href={link}>
      <div className={`miniLogo ${className}`}>
        <img src="/favicon.png" alt="UwU market" />
        {secret}
      </div>
    </a>
  );
}
