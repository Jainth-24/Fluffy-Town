import { Button } from './Button';
import { Text } from './Text';

export default function EmptyOrders() {
  return (
    <div>
      <Text className="mb-1" size="fine" width="narrow" as="p">
        You haven&apos;t placed any orders yet.
      </Text>
      <div className="w-48">
        <Button className="mt-2 w-full text-sm" variant="secondary" to="/">
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
