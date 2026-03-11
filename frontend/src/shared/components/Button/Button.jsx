import './Button.css';

const Button = ({
  children,
  variant  = 'primary',
  size     = 'md',
  type     = 'button',
  disabled = false,
  fullWidth= false,
  onClick,
  className = '',
  ariaLabel,
}) => (
  <button
    type={type}
    className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button;
