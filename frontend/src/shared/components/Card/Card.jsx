import './Card.css';

const Card = ({ children, className = '', glow = false, noPad = false, style }) => (
  <div
    className={`card ${glow ? 'card--glow' : ''} ${noPad ? 'card--no-pad' : ''} ${className}`}
    style={style}
  >
    {children}
  </div>
);

export default Card;
