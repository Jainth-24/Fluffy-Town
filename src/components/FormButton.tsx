'use client';
import { Button } from 'flowbite-react';
// @ts-ignore
import { useFormStatus } from 'react-dom';
export default function FormButton({
  btnText,
}: {
  btnText: string;
  variant?: 'primary' | 'outline';
}) {
  const status = useFormStatus();

  return (
    <div className='flex justify-center'>
      <Button
        isProcessing={status?.pending}
       color='warning'
        className={'rounded-md px-4 w-full'}
        type="submit"
      >
        {btnText}
      </Button>
      </div>
  );
}
