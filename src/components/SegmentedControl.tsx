import './SegmentedControl.css';

interface SegmentedControlProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

function SegmentedControl<T extends string>({ options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <div className={`segmented${className ? ` ${className}` : ''}`}>
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          className={`segmented-item${opt.value === value ? ' active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default SegmentedControl;
