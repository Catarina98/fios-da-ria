import Button from '@components/ui/button';
import { ButtonSize, ButtonVariant } from '@typing/components/button';
import { ArrowRight, ShoppingCart } from 'lucide-react';

export default function ComponentsShowcase() {
  return (
    <div
      style={{
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
      }}
    >
      <h1 className="text-3xl font-bold">Reusable Components Showcase</h1>

      {/* --- VARIANTS --- */}
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>Variants</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant={ButtonVariant.Primary}>Primary Button</Button>
          <Button variant={ButtonVariant.Secondary}>Secondary Button</Button>
          <Button variant={ButtonVariant.Tertiary}>Tertiary Button</Button>
          <Button variant={ButtonVariant.Ghost}>Ghost Button</Button>
        </div>
      </div>

      {/* --- STATES --- */}
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>States</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button disabled>Disabled</Button>
          <Button isLoading>Loading State</Button>
        </div>
      </div>

      {/* --- ICONS --- */}
      <div>
        <h3 style={{ marginBottom: '12px', fontWeight: 'bold' }}>With Icons</h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Large}
            leftIcon={<ShoppingCart size={16} />}
          >
            Add to Cart
          </Button>
          <Button rightIcon={<ArrowRight size={16} />}>Next Step</Button>
        </div>
      </div>
    </div>
  );
}
