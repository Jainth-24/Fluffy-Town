import { Button } from './Button';
import { IconClose } from './Icon';
import { Text } from './Text';

interface IFormModal {
  heading: string;
  children: React.ReactNode;
  action: () => void;
}

function FormModal({ heading, children, action }: IFormModal) {
  return (
    <>
      <div className="fixed inset-0 z-20 bg-white bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="bg-white relative flex-1 overflow-hidden rounded px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-12 sm:w-full sm:max-w-sm sm:flex-none sm:p-6">
            <Text className="mb-6 mt-4" as="h3" size="lead">
              {heading}
            </Text>
            <form className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block" action={action}>
              <Button
                className="text-primary hover:text-primary/50 -m-4 p-4 transition"
                type="submit"
                variant="outline"
              >
                <IconClose />
              </Button>
            </form>
            <div className="max-w-lg">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormModal;
