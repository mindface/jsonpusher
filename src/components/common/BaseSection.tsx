import { SectionProps } from '../../type/common';

export const BaseSection = ({ title, description, children, className = '' }: SectionProps) => {
  return (
    <section className={`base-section ${className}`}>
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
      <div className="section-content">
        {children}
      </div>
    </section>
  );
}; 